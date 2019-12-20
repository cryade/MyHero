const env = process.env.NODE_ENV || 'prod'; // 'dev' or 'test'

{
  const test = {
    DBHost: 'mongodb+srv://MyHeroAdmin:MyHeroDatabase@myherodatabase-zpl5k.mongodb.net/MyHeroDatabase?retryWrites=true&w=majority'
  };
  const prod = {
    DBHost: 'mongodb+srv://MyHeroAdmin:MyHeroDatabase@myherodatabase-zpl5k.mongodb.net/test?retryWrites=true&w=majority'
  };

  const config = {
    prod,
    test
  };
  module.exports = config[env];
}
