import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import supabase from "../../auth/supabase";
import { useAuth } from "../../auth/AuthProvider";
import { Listing } from "../../types";
import SmallItem from "./SmallItem";
import ListingModal from "./ListingModal";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const GridSection = () => {
  const { customUser } = useAuth();
  const [currentListings, setCurrentListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tileSize, setTileSize] = useState("small");
  const [filterCriteria, setFilterCriteria] = useState("recent");
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const handleFetchingListings = async () => {
    if (!customUser) return;
    const { data: Listings, error } = await supabase
      .from("Listings")
      .select("*")
      .is("date_deleted", null)
      .eq("school", customUser.school);

    if (error) {
      console.error("Error fetching listings:", error);
      return;
    }

    setCurrentListings(Listings as Listing[]);
  };

  const filterListings = (listings: Listing[], criteria: string): Listing[] => {
    switch (criteria) {
      case "price ascending":
        return [...listings].sort((a, b) => a.price - b.price);
      case "price descending":
        return [...listings].sort((a, b) => b.price - a.price);
      case "popularity":
        return [...listings].sort(
          (a, b) => (b.liked_by?.length || 0) - (a.liked_by?.length || 0)
        );
      case "recent":
      default:
        return [...listings].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  };

  const handleOpenModal = (listing: Listing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedListing(null);
  };

  useEffect(() => {
    handleFetchingListings();
  }, [customUser]);

  useEffect(() => {
    setFilteredListings(filterListings(currentListings, filterCriteria));
  }, [currentListings, filterCriteria]);

  const handleTileSizeChange = (event: SelectChangeEvent<string>) => {
    setTileSize(event.target.value as string);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterCriteria(event.target.value as string);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        justifyContent="flex-end"
        width="100%"
        marginRight="10px"
      >
        <FormControl
          variant="outlined"
          sx={{ minWidth: 120, marginBottom: 2, marginRight: "7px" }}
        >
          <InputLabel id="tile-size-select-label">Tile Size</InputLabel>
          <Select
            labelId="tile-size-select-label"
            id="tile-size-select"
            value={tileSize}
            onChange={handleTileSizeChange}
            label="Tile Size"
            sx={{
              height: 0.05 * height,
              color: theme.palette.customColors.royalBlue,
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.customColors.royalBlue,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.customColors.royalBlue,
              },
              ".MuiSvgIcon-root": {
                color: theme.palette.customColors.royalBlue,
              },
            }}
          >
            <MenuItem value="small">small tiles</MenuItem>
            <MenuItem value="large">large tiles</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }}>
          <InputLabel id="filter-select-label">Filter By</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filterCriteria}
            onChange={handleFilterChange}
            label="Filter By"
            sx={{
              height: 0.05 * height,
              color: theme.palette.customColors.royalBlue,
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.customColors.royalBlue,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.customColors.royalBlue,
              },
              ".MuiSvgIcon-root": {
                color: theme.palette.customColors.royalBlue,
              },
            }}
          >
            <MenuItem value="recent">most recent</MenuItem>
            <MenuItem value="price ascending">price ascending</MenuItem>
            <MenuItem value="price descending">price descending</MenuItem>
            <MenuItem value="popularity">popularity</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} paddingTop="10px">
        {filteredListings.map((listing) => (
          <Grid
            item
            xs={12}
            sm={tileSize === "small" ? 4 : 6}
            md={tileSize === "small" ? 12 / 5 : 4}
            key={listing.id}
          >
            <SmallItem listing={listing} onClick={handleOpenModal} />
          </Grid>
        ))}
      </Grid>
      <ListingModal
        open={modalOpen}
        handleClose={handleCloseModal}
        listing={selectedListing}
      />
    </Box>
  );
};

export default GridSection;
