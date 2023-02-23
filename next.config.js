
module.exports = {
    async rewrites() {
        return [
          {
            source: 'http://admin.berrygoodmedia.org:3000/*',
            destination: 'http://54.145.61.200:3000/*',
          },
        ]
    },
};