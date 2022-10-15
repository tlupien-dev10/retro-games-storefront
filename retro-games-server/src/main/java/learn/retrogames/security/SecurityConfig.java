package learn.retrogames.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Autowired
    private PasswordEncoder encoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers("/api/auth/authenticate").permitAll()
                .antMatchers("/api/auth/create_account", "/create-checkout-session").permitAll()
                .antMatchers("/api/auth/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET, "/api/listing").permitAll()
                .antMatchers(HttpMethod.GET, "/api/listing/*").permitAll()
                .antMatchers(HttpMethod.POST, "/api/listing").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/listing/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/listing/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/order", "/api/order/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/order").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/payment").hasAnyRole("USER","ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/order/*").hasRole("ADMIN")

                .anyRequest().denyAll()
                .and()
                // new ...
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

}
