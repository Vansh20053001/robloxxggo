import React from 'react';
import Layout from '../components/Layout';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import '../styles/style.css';

export default function RobloxPlatform() {
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
          RobloxGo | All Roblox Platforms - Pros, Cons and Updates
        </h1>

        <div className="main">
          <span className="page_footer">
            <span className="text">
              <p>
                If you haven&apos;t realized this, Roblox is actually a cross-platform game. You can <a href="https://www.roblox.com/" rel="nofollow noopener noreferrer" target="_blank">play the game on your PC</a>
                {' '}
                by downloading and installing the game&apos;s mini-client, Roblox Player (or the Roblox browser) or
                on your XBox One console. You could also enjoy the game on your mobile devices, be it an <a href="https://play.google.com/store/apps/details?id=com.roblox.client&amp;hl=en" rel="nofollow noopener noreferrer" target="_blank">Android</a>, an <a href="https://itunes.apple.com/us/app/roblox-mobile/id431946152" rel="nofollow noopener noreferrer" target="_blank">iOS</a> or even a Kindle Fire device. If you&apos;ve been swept up by the virtual
                reality hype... well, you can play the game on the Oculus Rift too. Just take your pick!
                <br />
                <br />
                However, if you plan on doing some &quot;heavy lifting&quot; a.k.a. building your own virtual worlds or
                game, you will need to install another mini-client called &quot;Roblox Studio&quot; before you can get
                started. The tools and options you can access in these two mini-clients are very different and
                that&apos;s why you&apos;ll need to have 2 separate clients installed. That said, if you only plan on
                playing the many games on Roblox, having the Roblox Player should be sufficient.
                <br />
                <br />
                When it comes to games, the more platforms it is available on; the more accessible it is to the
                general gaming population. However, due to the large differences between different gaming
                platforms, some compromises are necessary to make things work. Thus, you can definitely expect
                some differences when it comes to playing Roblox on your PC and on your tablet or smartphone.
                <br />
                <br />
                For starters, the controls will be different and so will the positions of various tools and
                options. It might take awhile to get used to the new interface and controls, but once you get
                through the learning process, you will be able to play Roblox whenever and wherever you want!
              </p>

              <p>
                Roblox can be played on your PC, console, mobile devices and even in virtual reality.
                <br />
                <br />
                In terms of consoles, Roblox is also available for Xbox One players who like using controllers
                instead of the keyboard and mouse. If you&apos;re a Playstation or Wii user instead, don&apos;t get all
                upset just yet! Although there is nothing solid, it is very likely that the development team
                behind Roblox will eventually port the game over to the PS4 and even Wii.
                <br />
                <br />
                For those of you who love playing games in virtual reality, you&apos;ll be glad to know that Roblox
                is also available on the Oculus Rift. All you need to do is to open the Oculus App on your PC,
                check &quot;Allow Unknown Sources&quot; from the settings, and start your Roblox Player as usual. The
                Player should automatically detect your Rift device and adopt a square screen as opposed to the
                default &quot;best fit&quot; option.
                <br />
                <br />
                Nonetheless, it&apos;s still a huge pity that players aren&apos;t and will not be able to play Roblox on
                any web browser they happen to have installed on their PC. This is mainly due to the fact that
                Roblox is actually quite complex. It is literally impossible for a simply browser to run any
                game in Roblox and hence, the need for a special Roblox browser, the Roblox Player. There are
                also other safety features embedded within the Roblox browser that help improve the quality of
                play for every player in the game.
                <br />
                <br />
                It does make it incredibly difficult for players who are using Chromebooks unless they go
                through a tough and complicated process of installing Linux on their machine and then getting
                the WINE app just so they could install and run Roblox. Regardless, this doesn&apos;t really dispel
                many players&apos; dream that they could simply load up Roblox on whatever internet browser they have
                one day and hop right into a game.
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
