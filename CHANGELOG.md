# Changelog
All notable changes for this project will be documented in this file.

## 0.0.18 - 2018-04-24
### Changed
- resource drawer shows up for sermons and lessons

## 0.0.17 - 2018-04-17
### Added
- rseries works
- can add lessons to RSeries
- LessonList, AddLesson, and the module Lesson were all added for the RSeries to work properly

### Changed
- firebase plugin now removes the extra 's' when looking for series

### Known Issues
- draggable and reordering of lessons inside an RSeries doesn't work...

## 0.0.16 - 2018-04-16
### Added
- users can now change their preferences of content and media types in Settings
- users can now add media directly from the sermon/lesson page

### Changed
- moved all add module functionality to the AddModule component instead of the ModuleList component

## 0.0.15 - 2018-04-14
### Added
- small piece of code to App.vue to disable FastClick -- important for editores in pwas to work properly

## 0.0.14 - 2018-04-13
### Added
- setting for preferred Bible translation
- Bible module now has an option for translation
- OMedia to handle media lists that were being done in OList, just to add clarity

### Changed
- Quotes in Sermons/Lessons need to be edited from either the media drawer inside the sermon/lesson or from the media lists on the left menu -- this will be changed eventually
- Remove Bible Passage list from sermons/lessons - not sure that's exactly what is helpful when building a lesson/sermon
- all media now uses the osis form for BibleRefs
- tag chips for media are colored as primary
- bibleRef chips for media are colored as secondary 

## 0.0.13 - 2018-04-12
### Changed
- edited Bible module to match new server bible system

## 0.0.12 - 2018-04-11
### Added
- FilePond for uploading images
- FilePondImagePreview for previewing images to be uploaded
- Uploaded images are stored in Firebase Storage
- viewing/editing is now possible for all media
- non-NQ Quotes can now be added to lessons!
- masonry plugin

### Changed
- OList now generates download urls for uploaded images when listing them all -- all uploaded images will probably end up at the end of the list currently...
- swapped out vue-bricks components with v-masonry instead -- much faster and easier to use
- right drawer is always closed by default
- left drawer is always open by default
- right drawer shows a masonry layout with searching and filtering for non-NQ users
- right drawer media for non-NQ users uses the same modal as viewing/editing from the OList

### Removed
- vue-bricks

## 0.0.11 - 2018-04-10
### Added
- Settings page
- light and dark theme set by user preferences in Settings
- Scratch Pads for writing down notes or ideas that could be turned into a sermon or lesson in the future
- users can now add and list all media types (save uploaded images)
- media added is directly appended onto the list

### Changed
- changed point to module
- all modules are not draggable when editing any module
- menu icons are the default until hover or active when they become the primary color
- menu item backgrounds are inherited rather than changing for hover and active
- adding content, olist, others now use singular types instead of plurarl

### Fixed
- right drawer closes on refresh for non-NQ users

### Removed
- bible plugin, to reduce confusion (it wasn't functional)

## 0.0.10 - 2018-04-09
### Added
- get user db values from firebase plugin
- user value from firebase into root component (App) for access from all components
- menu option available for realUser to switch to REAL Curriculum builder
- small logo for menu item
- builder layout menu items for media types

### Changed
- setup tooltips for real layout
- OList now checks types from a list to determine whether the list should show content or media
- names and paths for dashboards changed to better reflect a readable url
- renamed MediaList to MediaSearch to better reflect what that component does
- MediaSearch setup to receive search terms and return matching media from the database, currently setup for only non-NQ media
- Resources shows components based on whether a NQ or non-NQ user
- right drawer does not open automatically when writing for a non-NQ user (might change for all users?)

### Fixed
- default route for non-NQ users switched to dashboard rather than odashboard

## 0.0.9 - 2018-04-08
### Added
- separate Dashboard pages for REAL and Other
- OSermon page (same as OLesson currently)
- can add OSermon
- OList displays list of sermons
- real layout to separate users
- routes that separate real and other pages and the logic to restrict real pages to only real users
- NQList component to separate calls for NQ research media and simple builder media

### Changed
- firebase saves modules in o/lessons/ rather than olesson/
- database bible call requires version
- MediaList component should be used for simple builder media - not NQ media
- left drawer has been condensed to icons with tooltips to save on realestate

### Fixed
- Resources component doesn't load unless on 'olesson' route

## 0.0.8 - 2018-04-06
### Added
- quotes, ideas, outlines, and illustrations can now be added as modules from the Resources drawer
- Quote module filled out
- OLesson info is updated on blur (main idea, bible refs, and tags)

### Changed
- changed edit function for modules to edit, save, and close in order to differentiate between all those functions
- added buttons in all module "editing views" for saving and deleting the modules

## 0.0.7 - 2018-04-06
### Added
- research function in database plugin
- research can now be added to or deleted from OLessons

## 0.0.6 - 2018-04-05
### Added
- resources option for database plugin
- resources for connected topics are now shown in OLessons
- AddResearch component for adding new topics to a lesson

### Changed
- right drawer only opens for OLessons
- left drawer closes on OLessons
- right drawer is now the proper size
- bricks layout for right drawer resources now functions properly

## 0.0.5 - 2018-04-05
### Added
- ModuleList and modules folder
- Point, Text, Question, Activity, Bible modules (full functioning)
- Quote, Video, Image, Composition modules (just shells)
- vuefire plugin
- wordcounts and estimated time are generated for each module on save
- collaboration is possible by locking modules being edited by others
- drag and drop for modules is implemented
- all module data is synced back to Firebase

### Changed
- updated README file
- OLesson now uses ModuleList

### Fixed
- AddMedia page now uses this.$database instead of this.database
- Login page and builder layout now use this.$firebase instead of this.firebase

## 0.0.4 - 2018-03-23
### Changed
- updated database plugin to use new database url

## 0.0.3 - 2018-03-21
### Added
- database plugin
- add functionality to database
- can add Lessons and Series to other
- OList for listing other series and lessons
- RList for listing REAL series (possibly lessons)
- played with Edtiors a bit
- adding BibleRefs to an olesson will present the passages

### Issues
- No idea how to get resources from NQ to here...

## 0.0.2 - 2018-03-20
### Added
- Login page
- Dashboard page
- Logout button on the builder sidebar
- firebase plugin - includes vuefire and vue-firestore
- vuelidate plugin
- REAL Curriculum logo

### Changed
- added Firebase authentication to router
- set dark theme

## 0.0.1 - 2018-03-19
### Added
- Initial commit
- New project