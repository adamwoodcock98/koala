const mongoose = require("mongoose");

require("../mongodb_helper");
const Message = require("../../models/messages");

const mockUserId = new mongoose.Types.ObjectId();
const secondMockUserId = new mongoose.Types.ObjectId();

describe("Message model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.messages.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    const newMessage = new Message({
      message: { text: "Hello, world!" },
    });
    expect(newMessage.message.text).toEqual("Hello, world!");
  });

  it("has a required message", (done) => {
    const message = new Message({ user: mockUserId });
    message.save((err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  it("has a user ID", () => {
    const message = new Message({
      message: "has a user ID",
      users: [mockUserId, secondMockUserId],
    });
    expect(message.users).toEqual(
      expect.arrayContaining([(mockUserId, secondMockUserId)])
    );
    expect(message.users).toHaveLength(2);
  });

  it("has a required user ID", (done) => {
    const message = new Message({ message: "has a required ID" });
    message.save((err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  it("has a createdAt time", () => {
    const message = new Message({
      message: "has a user ID",
      users: [mockUserId, secondMockUserId],
    });
    expect(message.createdAt).not.toBeNull();
  });

  it("can list all messages", (done) => {
    Message.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("has a required sender user ID", (done) => {
    const message = new Message({ sender: "has a required ID" });
    message.save((err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  it("can save a message", (done) => {
    const message = new Message({
      message: { text: "can save a message" },
      users: [mockUserId, secondMockUserId],
      sender: mockUserId,
    });

    message.save((err) => {
      expect(err).toBeNull();

      Message.find((err, message) => {
        expect(err).toBeNull();

        expect(message[0]).toMatchObject({
          message: { text: "can save a message" },
        });
        done();
      });
    });
  });
});
