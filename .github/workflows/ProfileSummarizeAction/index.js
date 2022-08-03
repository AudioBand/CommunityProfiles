const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

(async () => {
  try {
    // GitHub API token
    const githubToken = process.env['token'];

    const client = github.getOctokit(githubToken);

    const owner = github.context.payload.repository.owner.name;
    const repo = github.context.payload.repository.name;

    // Helper function for requesting content from GitHub API
    const getContent = async (path) => {
      return await client.rest.repos.getContent({
        owner,
        repo,
        path,
      });
    };
  
    // Get content of the entire 'CommunityProfiles' repository
    const profilesRepoContent = await getContent("Profiles");

    const profiles = [];
  
    // Loop through available profiles synchronously
    await Promise.all(profilesRepoContent.data.map(async (profile) => {
      // Return if element is not a directory
      if (profile.type != 'dir') return;

      // Get content of the profile's folder
      const profileContent = await getContent(profile.path);

      // Try finding 'about.json' file path, otherwise return
      const aboutFilePath = (profileContent.data.find((file) => file.name == 'about.json'))?.path;
      if (aboutFilePath == undefined) {
        console.log(`Profile '${profile.name}' has no 'about.json' file. Continuing with next profile...`);
        return;
      }

      // Get and parse content of 'about.json' file
      const aboutFileContent = await getContent(aboutFilePath);
      const aboutFile = JSON.parse(Buffer.from(aboutFileContent.data.content, aboutFileContent.data.encoding).toString());

      // Try finding 'xxx.profile.json' download url
      const profileUrl = (profileContent.data.find((file) => file.name.endsWith('.profile.json')))?.download_url;
      if (profileUrl == undefined) {
        console.log(`Profile '${profile.name}' has no 'xxx.profile.json' file. Continuing with next profile...`);
        return;
      }

      // Try finding image url
      const imageUrl = (profileContent.data.find((file) => file.name.endsWith('.jpg') || file.name.endsWith('.png')))?.download_url;
      if (imageUrl == undefined)
        console.log(`Profile '${profile.name}' has no image ('.jpg' or '.png') file. Ignoring...`)
      
			// Add profile information to summary
      profiles.push({
        name: profile.name,
        description: aboutFile.Description,
        authors: aboutFile.Authors,
        version: aboutFile.Version,
        imageUrl: imageUrl,
        profileUrl: profileUrl,
      });
    }));

    // Write to summarized file
    fs.writeFile('./ProfilesSummary.json', JSON.stringify(profiles, undefined, 2), (err) => {
      if (err) {
        core.setFailed(err.message);
        return;
      }
    });

  } catch (error) {
    core.setFailed(error.message);
  }
})();
