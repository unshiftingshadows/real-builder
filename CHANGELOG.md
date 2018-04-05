# Changelog
All notable changes for this project will be documented in this file.

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