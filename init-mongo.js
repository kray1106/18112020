db.createUser({
  user: "kray",
  pwd: "secret",
  roles: {
    role: "readWrite",
    db: "weather",
  },
});
