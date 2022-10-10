package learn.retrogames.data.mappers;

import learn.retrogames.models.Console;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ConsoleMapper implements RowMapper<Console> {
    @Override
    public Console mapRow(ResultSet resultSet, int i) throws SQLException {
        Console console = new Console();
        console.setId(resultSet.getInt("console_id"));
        console.setVersion(resultSet.getString("console_version"));
        console.setCompany(resultSet.getString("company"));
        if (resultSet.getDate("release_date") != null) {
            console.setReleaseDate(resultSet.getDate("release_date").toLocalDate());
        }
        return console;
    }
}
