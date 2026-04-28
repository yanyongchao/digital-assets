import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { User } from "@/api/user/userModel";
import { userService } from "@/api/user/userService";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { ServiceResponse as ServiceResponseModel } from "@/common/models/serviceResponse";
import { app } from "@/server";

const mockUsers: User[] = [
	{
		id: 1,
		name: "Alice",
		email: "alice@example.com",
		age: 42,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		name: "Bob",
		email: "bob@example.com",
		age: 21,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

afterEach(() => {
	vi.restoreAllMocks();
});

describe("User API Endpoints", () => {
	describe("GET /users", () => {
		it("should return a list of users", async () => {
			vi.spyOn(userService, "findAll").mockResolvedValue(
				ServiceResponseModel.success("Users found", mockUsers, StatusCodes.OK),
			);

			// Act
			const response = await request(app).get("/users");
			const responseBody: ServiceResponse<User[]> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Users found");
			expect(responseBody.data.length).toEqual(mockUsers.length);
			responseBody.data.forEach((user, index) => compareUsers(mockUsers[index] as User, user));
		});
	});

	describe("GET /users/:id", () => {
		it("should return a user for a valid ID", async () => {
			// Arrange
			const testId = 1;
			const expectedUser = mockUsers.find((user) => user.id === testId) as User;
			vi.spyOn(userService, "findById").mockResolvedValue(
				ServiceResponseModel.success("User found", expectedUser, StatusCodes.OK),
			);

			// Act
			const response = await request(app).get(`/users/${testId}`);
			const responseBody: ServiceResponse<User> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("User found");
			if (!expectedUser) throw new Error("Invalid test data: expectedUser is undefined");
			compareUsers(expectedUser, responseBody.data);
		});

		it("should return a not found error for non-existent ID", async () => {
			// Arrange
			const testId = Number.MAX_SAFE_INTEGER;
			vi.spyOn(userService, "findById").mockResolvedValue(
				ServiceResponseModel.failure("User not found", null, StatusCodes.NOT_FOUND),
			);

			// Act
			const response = await request(app).get(`/users/${testId}`);
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(responseBody.success).toBeFalsy();
			expect(responseBody.message).toContain("User not found");
			expect(responseBody.data).toBeNull();
		});

		it("should return a bad request for invalid ID format", async () => {
			// Act
			const invalidInput = "abc";
			const response = await request(app).get(`/users/${invalidInput}`);
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(responseBody.success).toBeFalsy();
			expect(responseBody.message).toContain("Invalid input");
			expect(responseBody.data).toBeNull();
		});
	});
});

function compareUsers(mockUser: User, responseUser: User) {
	if (!mockUser || !responseUser) {
		throw new Error("Invalid test data: mockUser or responseUser is undefined");
	}

	expect(responseUser.id).toEqual(mockUser.id);
	expect(responseUser.name).toEqual(mockUser.name);
	expect(responseUser.email).toEqual(mockUser.email);
	expect(responseUser.age).toEqual(mockUser.age);
	expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
	expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
}
