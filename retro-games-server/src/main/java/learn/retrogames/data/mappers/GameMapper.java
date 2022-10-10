package learn.retrogames.data.mappers;

import learn.retrogames.models.Console;
import learn.retrogames.models.Game;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GameMapper implements RowMapper<Game> {

    @Override
    public Game mapRow(ResultSet resultSet, int i) throws SQLException {
        Game game = new Game();
        game.setId(resultSet.getInt("game_id"));
        game.setGenre(resultSet.getString("genre"));
        game.setPublisher(resultSet.getString("publisher"));
        if (resultSet.getDate("release_date") != null) {
            game.setReleaseDate(resultSet.getDate("release_date").toLocalDate());
        }
        return game;
    }
}
