package learn.retrogames.data.mappers;

import learn.retrogames.models.Listing;
import learn.retrogames.models.ListingType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ListingMapper implements RowMapper<Listing> {

    @Override
    public Listing mapRow(ResultSet resultSet, int i) throws SQLException {
        Listing listing = new Listing();
        listing.setId(resultSet.getInt("listing_id"));
        listing.setName(resultSet.getString("listing_name"));
        listing.setDescription(resultSet.getString("listing_description"));
        listing.setImagePath("image_path");
        listing.setListingType(ListingType.valueOf(resultSet.getString("listing_type")));
        listing.setQuantity(resultSet.getInt("quantity"));
        return null;
    }
}
