import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/austinjstromme/CoffeeTeam.git', // Update to point to your repository
  user: {
   name: 'Austin Stromme', // update to use your name
   email: 'austinjstromme@gmail.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);
