import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useDebounce from "@/hooks/useDebounce";
import { useFetchMovies } from "@/hooks/useFetchMovies";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useFetchMovies(
    debouncedSearchQuery,
    debouncedSearchQuery.trim().length > 0
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0 flex-1"
        resizeMode="cover"
      />

      <FlatList
        data={debouncedSearchQuery.trim().length > 0 ? movies?.results : []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="flex-row w-full justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies"
                onChange={setSearchQuery}
                value={searchQuery}
              />

              {isLoading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              {error && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {error.message}
                </Text>
              )}

              {!isLoading &&
                !error &&
                debouncedSearchQuery.trim() &&
                movies?.results?.length && (
                  <Text className="text-white font-bold text-xl">
                    Search Results for{" "}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}
            </View>
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <View className="mt-8 px-5">
              <Text className="text-center text-gray-500">
                {debouncedSearchQuery.trim()
                  ? "No movies found"
                  : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
