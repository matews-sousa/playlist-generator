const generatePlaylist = async (spotify, artistId) => {
  // get related artists with the selected artist
  const relatedArtistsRes = await spotify.getArtistRelatedArtists(artistId);
  const { artists } = relatedArtistsRes.body;

  // get array of top tracks of each artist
  const topTracksArr = [];
  for (const i in artists) {
    const topRes = await spotify.getArtistTopTracks(artists[i].id, "GB");
    const { tracks } = topRes.body;

    // push the first 2 tracks
    topTracksArr.push(tracks.slice(0, 2));
  }

  // merge all all tracks and sort by popularity
  const topTracks = [].concat.apply([], topTracksArr);
  const sortPopularity = topTracks.sort((a, b) =>
    a.popularity < b.popularity ? 1 : -1
  );

  return sortPopularity;
};

export default generatePlaylist;
