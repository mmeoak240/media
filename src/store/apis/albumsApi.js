import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
const albumsApi = createApi({
	reducerPath: "albums",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
	}),
	endpoints(builder) {
		return {
			addAlbum: builder.mutation({
				invalidatesTags: ["Album"],
				query: (user) => {
					return {
						url: "/albums",
						method: "POST",
						body: {
							userId: user.id,
							title: faker.commerce.productName(),
						},
					};
				},
			}),
			fetchAlbums: builder.query({
				providesTags: ["Album"],
				query: (user) => {
					return {
						url: "/albums",
						params: {
							userId: user.id,
						},
						method: "GET",
					};
				},
			}),
		};
	},
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
