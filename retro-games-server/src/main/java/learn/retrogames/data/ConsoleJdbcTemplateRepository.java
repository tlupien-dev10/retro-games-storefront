package learn.retrogames.data;

import learn.retrogames.data.mappers.ConsoleMapper;
import learn.retrogames.models.Console;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.stream.Collectors;

public class ConsoleJdbcTemplateRepository implements ConsoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public ConsoleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Integer> getAvailableConsoleIds() {
        final String sql = "SELECT * FROM console WHERE deleted = 0;";
        List<Console> consoles = jdbcTemplate.query(sql, new ConsoleMapper());
        return consoles.stream().map(Console::getId).collect(Collectors.toList());
    }
}
