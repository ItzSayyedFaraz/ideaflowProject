# Getting Started with Create React App

# The project was build using react as an assesment for ideaflow.io.

 [IdeaFlow_react.pdf](https://github.com/ItzSayyedFaraz/ideaflowProject/files/12489954/IdeaFlow_react.pdf)
#The task was to buid a project using any text editor where on where on typing in input field if it includes '<>'
 than it should produce a drop down list of ideas and if it includes '#' than it should search in reference documents which 
 includes the typed text.
#The project was completed with following components
 Home-This component searches for ideas if input text includes '<>' & for reference if it includes'#'.you dont need to logi for
this.For reference search following documents were added at backend using firebase.if you perform reference search it
      will search through these documents.
     1) ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
     2) "Jack quickly enjoyed a big, juicy hamburger with extra pickles. My friend Tim has a cute black cat named Whiskers. The five boxing wizards jump quickly. Mr. Jock, TV quiz PhD, bags few lynx. A wizard's job is to vex chumps quickly in fog. Amazingly few discotheques provide jukeboxes. Back in my quaint garden, jaunty zinnias vie with flaunting phlox. Mr. Nix, I'd like a fresh jug for mixing fizzy cocktails."
     3)"The quick brown fox jumps over the lazy dog 1234567890."
     you can preview your data & delete reference
     
 Sign-This component let users signin.
 Signup-This component let users signin.
 Addidea-This component lets you add idea and subidea.only logged in users will be able to add ideas and sub idea
        For adding subidea reference idea is necessary otherwise operation will fail.
backspace event is added when you search for ideas i.e if input text includes <> and you press backspace whole text will be removed leaving input field empty.
