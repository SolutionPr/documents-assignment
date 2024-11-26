module.exports = {
    name: "Assignment",
    script: "node_modules/serve/build/main.js",
    args: ["-s", "build", "-p", "3019"],
    watch: true,
    ignore_watch: ["node_modules", "build"],
    exec_mode: "fork",
};
