package learn.retrogames.data.mappers;

import learn.retrogames.models.Merchandise;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MerchandiseMapper implements RowMapper<Merchandise> {
    @Override
    public Merchandise mapRow(ResultSet resultSet, int i) throws SQLException {
        Merchandise merch = new Merchandise();
        merch.setId(resultSet.getInt("merchandise_id"));
        merch.setCategory(resultSet.getString("merchandise_category"));
        return merch;
    }
}
