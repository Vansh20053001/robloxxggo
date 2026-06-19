import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import '../styles/style.css';

export default function About() {
  return (
    <Layout>
      <div className="bnr_970">
        <center />
      </div>
      <span class="push">
        <span class="circle_border">
          <span class="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos &amp; Power Tips" class="mobile" />
          </span>
        </span>
      </span>
      <div className="content">
        <h1 className="page-title" style={{ width: '100%' }}>
          RobloxGo | About RobloxGo - The Go To Place For All Roblox Fans!
        </h1>

        <div className="main">
          <span className="page_footer">
            <span className="text">
              <p>
                With millions of concurrent players and countless user-generated experiences, Roblox is more than a game; it&apos;s a platform where users express their creativity, play through countless experiences, and have fun online with other players. With a vibrant and thriving community of players and robust game-creation tools, you can create worlds, structures, and even full-fledged games others can dive into.
                <br />
                <br />
                Playable on PC, mobile, and select consoles, it offers a broad range of Roblox games to play and experiences to dive into, thanks to its massive amount of user-generated content.
                With its voxel visuals and Lego-like blocks system, it appeals to players from all walks of life.
                <br />
                <br />
                Players who are into creation will be thrilled with Roblox Studio, the platform&apos;s proprietary engine that lets players craft their worlds and games.
                This easy-to-use and incredibly intuitive software allows users to create various &quot;experiences,&quot; from space-themed adventures to full-fledged RPGs.
                <br />
                <br />
                For those looking to play and explore, there are countless <Link to="/games/most_played">Roblox games</Link> you can play and worlds you can traverse.
                There are experiences with thousands of concurrent players, enabling you to meet, adventure with, and even face off against numerous users.
                <br />
                <br />
                Moreover, many of these are themed experiences, ranging from well-known anime franchises to sports and even the ever-popular battle royale genre.
                If it exists, then it has a Roblox version. For example, there are games inspired by a popular pirate anime and those comparable to a pet-raising and battling franchise.
                <br />
                <br />
                Through the years, Roblox continues to thrive primarily thanks to its vibrant and supportive community.
                Amidst the occasional challenges, the platform provides a secure environment for users to share their creations, exchange feedback, and forge social links.
                <br />
                <br />
                Roblox puts emphasis on its community, hosting an enormous selection of player-created worlds and mini-games, which are constantly growing to provide players with a vast range of content.
                Top examples of can be seen on <Link to="/charts">Roblox charts</Link>. You can even record yourself and showcase your creations seamlessly on social media.
                <br />
                <br />
                Roblox is more than just a game; it&apos;s a vibrant and ever-growing community of players and a powerful tool for users to create unique digital experiences.
                Thanks to its inclusive ecosystem and wide array of content, it is poised to maintain its appeal to all gamers for years to come.
              </p>
            </span>
          </span>

          <div className="bnr_728">
            <center />
          </div>
        </div>

        <div className="sidebar">
          <div className="bnr_250">
            <center />
          </div>

          <TopCharts />
          <TopLists />
        </div>
      </div>
    </Layout>
  );
}
