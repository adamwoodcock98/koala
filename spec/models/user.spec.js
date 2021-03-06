const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      User.syncIndexes(() => {
        done();
      })
    });
  });

  it("has a first name", () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual("Barry");
  });

  it("has a last name", () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.lastName).toEqual("Barry");
  });

  it("has an email address", () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    
    expect(user.password).toEqual("password");
  });

  it("has a friend", () => {
    const mockObjectId = new mongoose.Types.ObjectId();
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
      friends: [mockObjectId],
    });
    expect(user.friends[0]).toEqual(mockObjectId);
  });

  it("has a default profile picture", () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.profilePicture).toBe(
      "/images/koala.jpg"
    );
  });

  it("has a default cover photo", () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.coverPicture).toBe(
      "/images/koala-banner-2.jpeg"
    );
  });

  it("has first name as a required field", async () => {
    const user = new User({
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("has last name as a required field", async () => {
    const user = new User({
      firstName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("has email as a required field", async () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      password: "password",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("only accepts valid emails", async () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someoneexample.com",
      password: "password",
    });

    await expect(user.save()).rejects.toThrow();
  });

  it("email field has to be a unique entry", async() => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    await user.save();

    const user2 = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });
    await expect(user2.save()).rejects.toThrow();

  });

  it("the email is not case-sensitive", async () => {
    const user = new User({
      firstName: "Jerry",
      lastName: "Berry",
      email: "JerryBerry@example.com",
      password: "password",
    });
    await expect(user.email).toBe("jerryberry@example.com")
  });

  it("has password as a required field", async () => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
    });
    await expect(user.save()).rejects.toThrow();
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      firstName: "Barry",
      lastName: "Barry",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Barry",
          lastName: "Barry",
          email: "someone@example.com",
        });
        done();
      });
    });
  });
});
