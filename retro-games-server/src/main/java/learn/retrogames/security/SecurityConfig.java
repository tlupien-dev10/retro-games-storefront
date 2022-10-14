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
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/create_account").permitAll()
                .antMatchers("/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET, "/listing").permitAll()
                .antMatchers(HttpMethod.GET, "/listing/*").permitAll()
                .antMatchers(HttpMethod.POST, "/listing").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/listing/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/listing/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/order").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/order/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/order").permitAll()
                .antMatchers(HttpMethod.PUT, "/order/*").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/order/*").hasRole("ADMIN")
                .and()
                // new ...
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

}
