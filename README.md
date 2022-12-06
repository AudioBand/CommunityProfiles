# CommunityProfiles
This repository houses all the profiles uploaded by CommunityMembers, feel free to add yours to the list!
If you have any questions, you can always reach out for help on our [Discord Server](https://discord.gg/yWDHdH2za5)!

# Adding your profile
If you have no knowledge of Git and don't want to bother learning, feel free to contact me in an issue or on Discord to upload it for you.  

First, fork and then clone your fork locally, and create a new subfolder within the `Profiles\` folder.  
The name of that folder will be the name of your profile. 

**Make sure the profile name is identical everywhere, this is very important.**

## Adding the required files
Inside this folder you want to drag your `PROFILE_NAME.profile.json` (these can be found in `%appdata%/AudioBand/Profiles`).  
You also want to create a file called `about.json` in the subfolder with the following content:

```json
{
    "Description": "YOUR_DESCRIPTION",
    "Authors": "YOUR_NAME"
}
```

This is the bare minimum required to upload your profile, however I do highly recommend adding a preview image too.  

Just name the file `PROFILE_NAME.png` (PROFILE_NAME being the name of your profile, image width is best at 275px).

**That's it!**

## Using local images in a profile
Some people use local images for their buttons instead of text, which will require some extra work to setup.  

First, create a subfolder called `Assets` inside of your profile's folder. In here you want to add all images that are referenced in your `profile.json`.

Next you have to add path placeholders in your `profile.json`, because the paths will be different for every user.  
I'll give a concrete example of how to do it:  

Example of what a profile could look like locally:

```json
"NextButton": {
    "Content": {
      "ContentType": 0,
      "ImagePath": "C:\\Users\\vanro\\Pictures\\AudioBand.png",
      "HoveredImagePath": null,
      "ClickedImagePath": null,
      "FontFamily": "Segoe MDL2 Assets",
      "Text": "",
      "TextColor": "#FFFFFFFF",
      "HoveredTextColor": "#FFFFFFFF",
      "ClickedTextColor": "#FFFFFFFF"
    },
    "CornerRadius": 10,
    "BackgroundColor": "#00FFFFFF",
    "HoveredBackgroundColor": "#19FFFFFF",
    "ClickedBackgroundColor": "#0FFFFFFF",
    "IsVisible": true,
    "Width": 40.0,
    "Height": 15.0,
    "XPosition": 410.0,
    "YPosition": 3.0,
    "Anchor": 9
  },
  ```

As you can see the `ImagePath` will not work for every user, so we have to change it so it can adapt whenever someone downloads it.

You have to change the path to `%AssetsFolder%/YOUR_PROFILE/IMAGE.png`, in my case that would be `%AssetsFolder%/Default/AudioBand.png`.

**Make sure that the image is called AudioBand.png inside of the Assets/ folder you uploaed**

This is what my `profile.json` would look like:

```json
"NextButton": {
    "Content": {
      "ContentType": 0,
      "ImagePath": "%AssetsFolder%\\Default\\AudioBand.png",
      "HoveredImagePath": null,
      "ClickedImagePath": null,
      "FontFamily": "Segoe MDL2 Assets",
      "Text": "",
      "TextColor": "#FFFFFFFF",
      "HoveredTextColor": "#FFFFFFFF",
      "ClickedTextColor": "#FFFFFFFF"
    },
    "CornerRadius": 10,
    "BackgroundColor": "#00FFFFFF",
    "HoveredBackgroundColor": "#19FFFFFF",
    "ClickedBackgroundColor": "#0FFFFFFF",
    "IsVisible": true,
    "Width": 40.0,
    "Height": 15.0,
    "XPosition": 410.0,
    "YPosition": 3.0,
    "Anchor": 9
  },
  ```
