// App.js

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Animated, Easing, Modal } from 'react-native';
import { Alert } from 'react-native';


const getFonts = () => Font.loadAsync({
  'press-start': require('./assets/fonts/PressStart2P-Regular.ttf'),
});

// =======================
// TITLE SCREEN COMPONENT
// =======================
const TitleScreen = ({ onStart }) => {
  const fadeAnim = useState(new Animated.Value(0))[0]; // fade for title/subtitle
  const pulseAnim = useState(new Animated.Value(0))[0]; // start invisible

  useEffect(() => {
    // Fade in title/subtitle
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(() => {
      // Start pulsing after fade-in completes
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.titleScreenContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.titleText}>WELCOME TO THE APOCALYPSE QUIZ</Text>
        <Text style={styles.subtitleText}>Find out how you survive the apocalypse</Text>
      </Animated.View>

      <Animated.View style={{ opacity: pulseAnim }}>
        <TouchableOpacity onPress={onStart}>
          <Text style={styles.tapToStart}>TAP TO START</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const allQuestions = [
{
  question: "THE WORLD JUST ENDED. WHAT'S YOUR FIRST MOVE?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/mushroomcloud.png",
    alt: "A rising mushroom cloud casting an eerie glow over ruins" 
  },
  options: [
    { text: 'Build a barricade out of canned beans', value: 'leader' },
    { text: 'Climb a microwave tower to search for signal', value: 'support' },
    { text: 'Loot everything that isn’t on fire', value: 'feral' },
    { text: 'Meditate and accept the void', value: 'weird' },
  ]
},
{
  question: "YOU FIND A STRANGE DEVICE HUMMING IN THE RUBBLE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/buzzingmachine.png",
    alt: "A broken, buzzing machine with faint glowing wires" 
  },
  options: [
    { text: 'Reverse-engineer it into a toaster', value: 'support' },
    { text: 'Smash it immediately. No risks.', value: 'feral' },
    { text: 'Lick it and chant softly', value: 'weird' },
    { text: 'Turn it into a weapon', value: 'leader' },
  ]
},
{
  question: "A MUTANT RAT ARMY APPROACHES. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/ratarmyresized.png",
    alt: "A swarm of oversized glowing-eyed rats charging forward" 
  },
  options: [
    { text: 'Negotiate. Even rats need HR', value: 'support' },
    { text: 'Screech louder to establish dominance', value: 'feral' },
    { text: 'Summon the spirits of sewer ancestors', value: 'weird' },
    { text: 'Organize a neighborhood defense grid', value: 'leader' },
  ]
},
{
  question: "A STRANGER OFFERS YOU A GLOWING MUSHROOM. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/glowingmushroom.png",
    alt: "A strange bioluminescent mushroom glowing with green light" 
  },
  options: [
    { text: 'Accept it and name it Greg', value: 'weird' },
    { text: 'Decline and file a report', value: 'leader' },
    { text: 'Run away with it and laugh', value: 'feral' },
    { text: 'Inspect it for medicinal use', value: 'support' },
  ]
}, 
{
  question: "YOUR WEAPON OF CHOICE IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/weapon.png",
    alt: "A pile of improvised weapons scattered across a cracked floor" 
  },
  options: [
    { text: 'Clipboard with sharpened corners', value: 'leader' },
    { text: 'Healing salve with a punch', value: 'support' },
    { text: 'Nail bat covered in stickers', value: 'feral' },
    { text: 'Cursed ukulele', value: 'weird' },
  ]
}, 
{
  question: "THE APOCALYPSE HAS TV AGAIN. YOUR SHOW?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/tv.png",
    alt: "A cracked old television flickering with static" 
  },
  options: [
    { text: '“Disaster Diaries: Planning the Panic”', value: 'leader' },
    { text: '“Survivor Support Circle”', value: 'support' },
    { text: '“Cooking with Roadkill”', value: 'feral' },
    { text: '“Whispers from the Ceiling Fan”', value: 'weird' },
  ]
},
{
  question: "HOW DO YOU START YOUR APOCALYPSE MORNING?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/sunrise.png",
    alt: "A fiery sunrise breaking over a ruined wasteland" 
  },
  options: [
    { text: 'Inventory and affirmations', value: 'leader' },
    { text: 'Stretch, share, and hydrate', value: 'support' },
    { text: 'Scream into the mist', value: 'feral' },
    { text: 'Sip tea with a ghost', value: 'weird' },
  ]
},
{
  question: "YOU’RE INVITED TO A WASTELAND PARTY. YOUR GIFT IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/party.png",
    alt: "A flickering bonfire surrounded by scavenged party decorations" 
  },
  options: [
    { text: 'A tactical punch bowl', value: 'leader' },
    { text: 'A box of shared memories', value: 'support' },
    { text: 'A bag of teeth and glitter', value: 'feral' },
    { text: 'A crystal that buzzes when stared at', value: 'weird' },
  ]
}, 
{
  question: "YOU FIND A FUNCTIONAL VEHICLE. IT RUNS ON:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/vehicle.png",
    alt: "A rusted vehicle with strange tubes and glowing fuel tanks" 
  },
  options: [
    { text: 'Dried fruit and accountability', value: 'leader' },
    { text: 'Feelings and essential oils', value: 'support' },
    { text: 'Gremlin screams', value: 'feral' },
    { text: 'Dreams of the old world', value: 'weird' },
  ]
},
{
  question: "A GIANT ROBOT WANTS TO JOIN YOUR CREW. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/robot.png",
    alt: "A towering robot covered in dents and scavenged armor" 
  },
  options: [
    { text: 'Assign it as logistics coordinator', value: 'leader' },
    { text: 'Offer emotional calibration training', value: 'support' },
    { text: 'Paint flames on its chest', value: 'feral' },
    { text: 'Ask if it dreams of rusting sheep', value: 'weird' },
  ]
},
{
  question: "YOU CHECK INTO THE LAST HOTEL ON EARTH. THE COMPLIMENTARY ITEM IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/hotel.png",
    alt: "A crumbling hotel lobby with dusty chandeliers" 
  },
  options: [
    { text: 'A keycard made from scrap metal', value: 'leader' },
    { text: 'A bed stuffed with old newspapers', value: 'support' },
    { text: 'A minibar full of mystery meat', value: 'feral' },
    { text: 'A lamp that whispers bedtime stories', value: 'weird' },
  ]
},
{
  question: "YOU FIND A LEGENDARY WEAPON IN THE RUINS. IT IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/weapon.png",
    alt: "An ominous weapon glinting in the rubble" 
  },
  options: [
    { text: 'A sword made of melted road signs', value: 'leader' },
    { text: 'A crossbow that fires angry beetles', value: 'support' },
    { text: 'A bat wrapped in barbed wire and rumors', value: 'feral' },
    { text: 'A gun that shoots tiny holograms of itself', value: 'weird' },
  ]
},
{
  question: "YOUR ENEMY FINALLY FALLS INTO YOUR TRAP. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/trap.png",
    alt: "A menacing pit trap surrounded by makeshift spikes" 
  },
  options: [
    { text: 'Deliver a speech so epic it becomes legend', value: 'leader' },
    { text: 'Make them clean your entire camp with a toothbrush', value: 'support' },
    { text: 'Release a swarm of weaponized crows', value: 'feral' },
    { text: 'Erase them from every photo… retroactively', value: 'weird' },
  ]
},
{
  question: "A DERELICT BOAT WASHES ASHORE. YOUR FIRST MOVE IS TO:",
  image: { uri: "https://raw.github.com/dboss212121/ApocalypseQuiz/main/assets/images/boat.png" },
  alt: "Tactical belt with pouches",
  options: [
    { text: 'Restore it into a seaworthy escape vessel', value: 'leader' },
    { text: 'Turn it into a floating community hub', value: 'support' },
    { text: 'Strip it for parts before anyone else can', value: 'feral' },
    { text: 'Sail it inland somehow, just to confuse people', value: 'weird' },
  ]
},
{
  question: "YOU DISCOVER AN ABANDONED POOL IN THE WASTELAND. YOUR PLAN IS TO:",
  image: { uri: "https://raw.github.com/dboss212121/ApocalypseQuiz/main/assets/images/pool.png" },
  alt: "Derelict pool",
  options: [
    { text: 'Fill it with clean water for the community', value: 'leader' },
    { text: 'Grow crops in it using the deep basin', value: 'support' },
    { text: 'Stock it with mutant fish for later snacking', value: 'feral' },
    { text: 'Turn it into an ominous art installation', value: 'weird' },
  ]
},
{
  question: "YOU FIND A TACTICAL BELT WITH MYSTERIOUS POUCHES. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/belt.png",
    alt: "A rugged tactical belt with oddly glowing pouches" 
  },
  options: [
    { text: 'Organize survival gear with military precision', value: 'leader' },
    { text: 'Fill it with snacks for the whole squad', value: 'support' },
    { text: 'Cram it full of stolen trinkets and bones', value: 'feral' },
    { text: 'Discover one pouch contains a portal to nowhere', value: 'weird' },
  ]
},
{
  question: "CHOOSE YOUR WASTELAND COMPANION ANIMAL:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/pet.png",
    alt: "A scrappy animal companion ready for chaos" 
  },
  options: [
    { text: 'A battle-hardened goat', value: 'leader' },
    { text: 'A one-eyed therapy pigeon', value: 'support' },
    { text: 'A hairless raccoon with trust issues', value: 'feral' },
    { text: 'A telepathic lizard that speaks in riddles', value: 'weird' },
  ]
},
{
  question: "A STRANGER APPROACHES YOUR CAMP. YOU DECIDE TO:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/stranger.jpg",
    alt: "A mysterious figure standing at the edge of your campfire light" 
  },
  options: [
    { text: 'Offer them a seat and negotiate terms', value: 'leader' },
    { text: 'Share a meal and learn their story', value: 'support' },
    { text: 'Circle behind them and take their boots', value: 'feral' },
    { text: 'Whisper to them in a language you just made up', value: 'weird' },
  ]
},
{
  question: "YOU’RE ENROLLED IN THE LAST POST-APOCALYPTIC COLLEGE. YOUR MAJOR IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/college.png",
    alt: "A dilapidated college building with banners of odd symbols" 
  },
  options: [
    { text: 'Survival Strategy and Bartering', value: 'leader' },
    { text: 'Mutant Relations and Counseling', value: 'support' },
    { text: 'Scavenging 101: Chaos Management', value: 'feral' },
    { text: 'Cryptic Arts and Oddities', value: 'weird' },
  ]
},
{
  question: "IN THE NEW ECONOMY, YOUR CURRENCY FEATURES:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/money.png",
    alt: "Crumpled bills with bizarre illustrations and symbols" 
  },
  options: [
    { text: 'A heroic figure with a duct-taped weapon', value: 'leader' },
    { text: 'A pair of hands shaking over a campfire', value: 'support' },
    { text: 'A snarling rat wearing a crown', value: 'feral' },
    { text: 'An eye that seems to follow you everywhere', value: 'weird' },
  ]
},
{
  question: "IT’S TIME FOR A DUEL. WHAT IS YOUR SECRET WEAPON OF CHOICE?:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/duel.png",
    alt: "A dusty dueling arena with strange improvised weapons" 
  },
  options: [
    { text: 'A sharpened broom handle', value: 'leader' },
    { text: 'An aggressively worded letter', value: 'support' },
    { text: 'Two angry raccoons tied together', value: 'feral' },
    { text: 'A spoon that whispers battle strategies', value: 'weird' },
  ]
},
{
  question: "WHAT’S YOUR MEAL PLAN?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/meal.png",
    alt: "A questionable apocalypse meal served on a rusty plate" 
  },
  options: [
    { text: "Scavenge for expired granola bars", value: "feral" },
    { text: "Hunt mutant squirrels", value: "leader" },
    { text: "Barter socks for canned spaghetti", value: "support" },
    { text: "Grow mushrooms in a toilet tank", value: "weird" }
  ]
},
{
  question: "YOUR BARRICADE IS THE LAST LINE OF DEFENSE AGAINST:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/barricade.png",
    alt: "Makeshift wooden barricade stacked with junkyard debris" 
  },
  options: [
    { text: 'A horde of caffeinated squirrels', value: 'leader' },
    { text: 'Door-to-door apocalypse salesmen', value: 'support' },
    { text: 'A river of hot cheese', value: 'feral' },
    { text: 'Time-traveling versions of yourself', value: 'weird' },
  ]
},
{
  question: "YOUR GANG FLAG PROUDLY DISPLAYS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/flag.png",
    alt: "Tattered gang flag waving in the radioactive wind" 
  },
  options: [
    { text: 'A possum holding a sword and a grudge', value: 'leader' },
    { text: 'Three raccoons in a trench coat flipping pancakes', value: 'support' },
    { text: 'A screaming cactus wearing sunglasses', value: 'feral' },
    { text: 'An eldritch sandwich that whispers your debts', value: 'weird' },
  ]
},
{
  question: "YOUR KARAOKE PERFORMANCE TONIGHT IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/karaoke.png",
    alt: "A lone microphone glowing under a flickering neon light" 
  },
  options: [
    { text: 'Screaming the Pokémon theme while being chased by a goose', value: 'leader' },
    { text: 'Interpretive dance to whale sounds in full medieval armor', value: 'support' },
    { text: 'Yodeling “Bohemian Rhapsody” while holding a suspicious ham', value: 'feral' },
    { text: 'Whisper-rapping the Bee Movie script in a smoky jazz bar', value: 'weird' },
  ]
},
{
question: "A STRANGE LIGHT APPEARS IN THE SKY. WHAT DO YOU DO?",
image: { 
  uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/light.png",
  alt: "Mysterious glowing light hovering in the night sky" },
  options: [
  { text: 'Point at it and yell “same” until it goes away', value: 'leader' },
  { text: 'Start selling tickets for the “End of the World Viewing Party”', value: 'support' },
  { text: 'Challenge it to a rap battle… and lose', value: 'feral' },
  { text: 'Offer it a sandwich as a peace treaty', value: 'weird' },
],
},
{
  question: "YOU HAVE A SMALL THUMB DRIVE FULL OF THE MOST IMPORTANT DATA FROM THE BEFORE TIMES. IT CONTAINS:",
  image: { uri: "https://raw.github.com/dboss212121/ApocalypseQuiz/main/assets/images/data.png" },
  alt: "Data drive",
  options: [
    { text: 'Hundreds of cat photos', value: 'leader' },
    { text: 'Recipes for different napalm flavors', value: 'support' },
    { text: 'Complete gibberish', value: 'feral' },
    { text: 'The script for every Jim Carrey movie', value: 'weird' },
  ]
},
{
  question: "YOU STUMBLE UPON A MYSTERIOUS PORTAL. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/portal.png",
    alt: "A swirling portal shimmering with unknown energy" 
  },
  options: [
    { text: 'Step through confidently', value: 'leader' },
    { text: 'Set up a research tent', value: 'support' },
    { text: 'Throw a rock in first', value: 'feral' },
    { text: 'Whisper a warning to the void', value: 'weird' },
  ]
},
{
  question: "YOU FIND AN ABANDONED AMUSEMENT PARK. YOUR PLAN IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/park.png",
    alt: "Rusty rides and eerie carnival lights" 
  },
  options: [
    { text: 'Turn it into a fortress', value: 'leader' },
    { text: 'Organize a scavenger hunt', value: 'support' },
    { text: 'Ride everything at full speed', value: 'feral' },
    { text: 'Meditate in the funhouse mirrors', value: 'weird' },
  ]
},
{
  question: "YOU DISCOVER A TALKING TOASTER. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/toaster.png",
    alt: "A sentient toaster blinking like it has secrets" 
  },
  options: [
    { text: 'Make it your tactical advisor', value: 'leader' },
    { text: 'Teach it to make meals for the group', value: 'support' },
    { text: 'Chase it around screaming', value: 'feral' },
    { text: 'Ask it about the meaning of toast', value: 'weird' },
  ]
},
{
  question: "YOU COME ACROSS A GIANT PILE OF SOCKS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/socks.png",
    alt: "A mountain of mismatched, dusty socks" 
  },
  options: [
    { text: 'Sort them by usefulness', value: 'leader' },
    { text: 'Distribute them evenly to survivors', value: 'support' },
    { text: 'Build a sock fort', value: 'feral' },
    { text: 'Wear them all at once for enlightenment', value: 'weird' },
  ]
},
{
  question: "A MYSTERIOUS FOG ROLLS IN. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/fog.png",
    alt: "Thick fog swallowing the landscape" 
  },
  options: [
    { text: 'Set up sentries and stay alert', value: 'leader' },
    { text: 'Use it to cover a supply run', value: 'support' },
    { text: 'Run screaming into it', value: 'feral' },
    { text: 'Breathe deeply and commune with spirits', value: 'weird' },
  ]
},
{
  question: "YOU FIND A STRANGE MUSICAL INSTRUMENT. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/instrument.png",
    alt: "An odd instrument with glowing strings" 
  },
  options: [
    { text: 'Lead a rally with it', value: 'leader' },
    { text: 'Play calming tunes for the group', value: 'support' },
    { text: 'Smash it loudly', value: 'feral' },
    { text: 'Listen for cosmic messages', value: 'weird' },
  ]
},
{
  question: "YOU SPOT A HOVERING DRONE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/drone.png",
    alt: "A small drone hovering and scanning the area" 
  },
  options: [
    { text: 'Hack it to serve your team', value: 'leader' },
    { text: 'Follow it to discover resources', value: 'support' },
    { text: 'Shoot it with a slingshot', value: 'feral' },
    { text: 'Bow respectfully', value: 'weird' },
  ]
},
{
  question: "YOU FIND A MYSTERIOUS CHEST IN THE DESERT. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/chest.png",
    alt: "An old chest half-buried in sand" 
  },
  options: [
    { text: 'Open it carefully and catalog contents', value: 'leader' },
    { text: 'Share the loot with allies', value: 'support' },
    { text: 'Kick it open violently', value: 'feral' },
    { text: 'Whisper secrets before opening', value: 'weird' },
  ]
},
{
  question: "YOU ENCOUNTER A HACKER WITH STRANGE TACTICS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/hacker.png",
    alt: "A hooded figure surrounded by floating code" 
  },
  options: [
    { text: 'Recruit them for strategy', value: 'leader' },
    { text: 'Learn their techniques', value: 'support' },
    { text: 'Mess with their system', value: 'feral' },
    { text: 'Ask cryptic questions', value: 'weird' },
  ]
},
{
  question: "YOU STUMBLE UPON A FLOATING ISLAND. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/floatingisland.png",
    alt: "A small island hovering mysteriously above the ground" 
  },
  options: [
    { text: 'Build a base atop it', value: 'leader' },
    { text: 'Explore it for resources', value: 'support' },
    { text: 'Jump off it recklessly', value: 'feral' },
    { text: 'Meditate on its floating mystery', value: 'weird' },
  ]
},
{
  question: "YOU FIND A GLOWING RUBBER DUCK. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/duck.png",
    alt: "A neon rubber duck floating in a puddle" 
  },
  options: [
    { text: 'Make it the team mascot', value: 'leader' },
    { text: 'Use it as a morale booster', value: 'support' },
    { text: 'Squish it repeatedly', value: 'feral' },
    { text: 'Ask it for stock tips', value: 'weird' },
  ]
},
{
  question: "A GIANT JELLO MONSTER APPROACHES. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/jello.png",
    alt: "A wobbling, translucent gelatinous creature" 
  },
  options: [
    { text: 'Negotiate a treaty', value: 'leader' },
    { text: 'Feed it spare snacks', value: 'support' },
    { text: 'Punch it repeatedly', value: 'feral' },
    { text: 'Dance with it to the music', value: 'weird' },
  ]
},
{
  question: "YOU DISCOVER A HAT THAT GIVES STRANGE POWERS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/magichat.png",
    alt: "A tall hat glowing with arcane energy" 
  },
  options: [
    { text: 'Wear it and lead', value: 'leader' },
    { text: 'Use it to help friends', value: 'support' },
    { text: 'Throw it into a fire', value: 'feral' },
    { text: 'Ask it philosophical questions', value: 'weird' },
  ]
},
{
  question: "YOU FIND A PILE OF MYSTICAL TOAST. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/toast.png",
    alt: "Slices of glowing toast stacked in an odd pattern" 
  },
  options: [
    { text: 'Distribute it fairly', value: 'leader' },
    { text: 'Offer it to hungry survivors', value: 'support' },
    { text: 'Eat it in one bite', value: 'feral' },
    { text: 'Use it to predict the future', value: 'weird' },
  ]
},
{
  question: "A STRANGE TUNNEL OF STUFFED ANIMALS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/socktunnel.png",
    alt: "A twisting tunnel made entirely of socks" 
  },
  options: [
    { text: 'Map it for safe passage', value: 'leader' },
    { text: 'Use it to smuggle supplies', value: 'support' },
    { text: 'Roll through it screaming', value: 'feral' },
    { text: 'Meditate inside it', value: 'weird' },
  ]
},
{
  question: "YOU FIND A ROBOT BUTTERFLY. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/butterfly.png",
    alt: "A giant frowning butterfly perched on a rock" 
  },
  options: [
    { text: 'Make it your adviser', value: 'leader' },
    { text: 'Cheer it up with gifts', value: 'support' },
    { text: 'Swat it angrily', value: 'feral' },
    { text: 'Have a philosophical debate', value: 'weird' },
  ]
},
{
  question: "A FLOATING ICE CREAM CONE BEGS FOR HELP. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/icecream.png",
    alt: "A hovering ice cream cone with pleading eyes" 
  },
  options: [
    { text: 'Rescue it carefully', value: 'leader' },
    { text: 'Share it with friends', value: 'support' },
    { text: 'Eat it immediately', value: 'feral' },
    { text: 'Ask it about the universe', value: 'weird' },
  ]
},
{
  question: "YOU FIND A MYSTICAL BROOM. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/broom.png",
    alt: "A broom glowing faintly and hovering slightly" 
  },
  options: [
    { text: 'Use it to lead operations', value: 'leader' },
    { text: 'Clean the camp efficiently', value: 'support' },
    { text: 'Swing it wildly', value: 'feral' },
    { text: 'Ask it to tell stories', value: 'weird' },
  ]
},
{
  question: "A TALKING ROCK OFFERS YOU ADVICE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/rock.png",
    alt: "A small rock with a mouth and tiny eyes" 
  },
  options: [
    { text: 'Listen carefully', value: 'leader' },
    { text: 'Take notes', value: 'support' },
    { text: 'Ignore it and throw it', value: 'feral' },
    { text: 'Ask it riddles back', value: 'weird' },
  ]
},
{
  question: "YOU FIND A GIANT SLIPPERY BANANA. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/banana.png",
    alt: "A massive banana sliding down a hill" 
  },
  options: [
    { text: 'Use it to create a trap', value: 'leader' },
    { text: 'Share it with the squad', value: 'support' },
    { text: 'Slip on it dramatically', value: 'feral' },
    { text: 'Meditate while balancing on it', value: 'weird' },
  ]
},
  // Add more questions in same format...
];

const roles = {
  weird: {
    description: 'Trash Oracle - Reads the future in garbage. Mysterious and oddly accurate.',
    image: require('./assets/images/Oracle.png'),
  },
  leader: {
    description: 'Regional Doom Coordinator - Schedules disaster like it’s a corporate retreat.',
    image: require('./assets/images/dj.png'),
  },
  support: {
    description: 'Mutant HR Manager - Resolves conflict with tasers and empathy.',
    image: require('./assets/images/MutantHR.png'),
  },
  feral: {
    description: 'Screamer Scout - Screams first, thinks later. Often right.',
    image: require('./assets/images/dancer.png'),
  },
};
// =======================
// MAIN APP COMPONENT
// =======================
export default function App() {
  const [isTitleVisible, setIsTitleVisible] = useState(true); // <-- NEW
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [mode, setMode] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [exitWarningVisible, setExitWarningVisible] = useState(false);

const confirmQuit = () => {
  setExitWarningVisible(true);
};

  useEffect(() => {
    if (mode) {
      let num = mode === 'basic' ? 10 : mode === 'advanced' ? 20 : 30;
      setQuizQuestions(getRandomQuestions(num));
    }
  }, [mode]);

  const getRandomQuestions = (num) => {
    const copy = [...allQuestions];
    while (copy.length < num) {
      copy.push(...allQuestions);
    }
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, num);
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMode(null);
    setShowResult(false);
  };

  const calculateResult = () => {
    const tally = {};
    answers.forEach(val => {
      tally[val] = (tally[val] || 0) + 1;
    });
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  };

  if (!fontsLoaded) {
    return <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={console.warn} />;
  }

  // ===== Title Screen before anything =====
  if (isTitleVisible) {
    return <TitleScreen onStart={() => setIsTitleVisible(false)} />;
  }

  // ===== Mode Selection =====
  if (!mode) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text style={styles.header}>CHOOSE YOUR APOCALYPSE QUIZ MODE</Text>
        <TouchableOpacity style={styles.button} onPress={() => setMode('basic')}><Text style={styles.buttonText}>BASIC (10 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('advanced')}><Text style={styles.buttonText}>ADVANCED (20 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('full')}><Text style={styles.buttonText}>FULL EVALUATION (30 Qs)</Text></TouchableOpacity>
      </View>
    );
  }

  // ===== Results Screen =====
  if (showResult) {
    const role = calculateResult();
    return (
      <ScrollView contentContainerStyle={styles.fullScreenContainer}>
        <Text style={styles.header}>YOUR APOCALYPSE CAREER IS:</Text>
        <Image source={roles[role].image} style={styles.image} />
        <Text style={styles.resultText}>{roles[role].description}</Text>
        <TouchableOpacity style={styles.button} onPress={restartQuiz}><Text style={styles.buttonText}>HOME</Text></TouchableOpacity>
      </ScrollView>
    );
  }

  // ===== Quiz Screen =====
  const q = quizQuestions[currentQuestion] ?? {};
  const progress = Math.round(((currentQuestion) / quizQuestions.length) * 100);

return (
  <ScrollView contentContainerStyle={styles.fullScreenContainer}>
    <Text style={styles.header}>{q.question}</Text>
    {q.image && <Image source={q.image} style={styles.image} />}
    {q.options && q.options.map((opt, index) => (
      <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(opt.value)}>
        <Text style={styles.buttonText}>{opt.text}</Text>
      </TouchableOpacity>
    ))}

    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]}></View>
    </View>

    {!showResult && (
      <TouchableOpacity style={styles.button} onPress={() => setExitWarningVisible(true)}>
        <Text style={styles.buttonText}>QUIT</Text>
      </TouchableOpacity>
    )}

    {/* Exit Warning Modal */}
    <Modal
      transparent={true}
      visible={exitWarningVisible}
      animationType="fade"
      onRequestClose={() => setExitWarningVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to quit?</Text>
          <TouchableOpacity style={styles.button} onPress={() => setExitWarningVisible(false)}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setExitWarningVisible(false);
            setCurrentQuestion(0);
            setAnswers([]);
            setQuizQuestions([]);
            setShowResult(false);
            setMode(null);
          }}>
            <Text style={styles.buttonText}>YES, QUIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flexGrow: 1,
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'press-start',
    fontSize: 12,
    color: '#00ff00',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    borderColor: '#00ff00',
    borderWidth: 2,
    padding: 12,
    marginTop: 16,
    width: '80%',
  },
  buttonText: {
    color: '#00ff00',
    fontFamily: 'press-start',
    fontSize: 10,
    textAlign: 'center',
  },
  resultText: {
    color: '#0ff',
    fontSize: 12,
    fontFamily: 'press-start',
    textAlign: 'center',
    marginVertical: 20,
  },
  progressContainer: {
    width: '80%',
    height: 12,
    backgroundColor: '#333',
    borderColor: '#00ff00',
    borderWidth: 2,
    marginTop: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
  image: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
  marginBottom: 16,
  borderColor: '#00eeff',
  borderWidth: 2,
},
container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'press-start',
    fontSize: 32,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'press-start',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  tap: {
    fontFamily: 'press-start',
    fontSize: 14,
    color: 'lime',
    marginTop: 50,
    textAlign: 'center',
  },
  titelHeader: {
    fontFamily: 'press-start',
    fontSize: 24,
    color: 'lime',
  },
  titleScreenContainer: {
    flex: 1,
    backgroundColor: '#000',        // black background
    alignItems: 'center',
    justifyContent: 'center',       // centers content vertically and horizontally
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: 'press-start',
    fontSize: 28,                   // big text
    color: '#00ff00',               // neon green
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitleText: {
    fontFamily: 'press-start',
    fontSize: 14,
    color: '#00ff00',
    textAlign: 'center',
    marginBottom: 40,
  },
  tapToStart: {
    fontFamily: 'press-start',
    fontSize: 12,
    color: '#00ff00',
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.7)",
  alignItems: "center",
  justifyContent: "center",
},
modalContent: {
  backgroundColor: "#222",
  padding: 20,
  borderRadius: 10,
  width: "80%",
  alignItems: "center",
},
modalText: {
  color: "#fff",
  fontSize: 18,
  marginBottom: 20,
  textAlign: "center",
},
});
