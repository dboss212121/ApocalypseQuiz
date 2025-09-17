// App.js

import { Audio } from 'expo-av';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Animated, Easing, Modal } from 'react-native';
import { Alert } from 'react-native';

const getFonts = () => Font.loadAsync({
  'press-start': require('./assets/fonts/PressStart2P-Regular.ttf'),
});

// =======================
// TITLE SCREEN COMPONENT
// =======================
const TitleScreen = ({ onStart }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];   // fade for title/subtitle
  const pulseAnim = useState(new Animated.Value(0))[0];  // pulse for "tap to start"

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
        <Text style={styles.subtitleText}>
          Find out how you survive the apocalypse
        </Text>
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
  { text: 'Build a barricade out of canned beans', value: 'receiptGolem' },
  { text: 'Climb a microwave tower to search for signal', value: 'doomDJ' },
  { text: 'Loot everything that isn’t on fire', value: 'glitterButcher' },
  { text: 'Meditate and accept the void', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A STRANGE DEVICE HUMMING IN THE RUBBLE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/buzzingmachine.png",
    alt: "A broken, buzzing machine with faint glowing wires" 
  },
  options: [
  { text: 'Reverse-engineer it into a toaster', value: 'cyborgCellist' },
  { text: 'Smash it immediately. No risks.', value: 'molotovMixologist' },
  { text: 'Lick it and chant softly', value: 'balloonNecromancer' },
  { text: 'Turn it into a weapon', value: 'libraryCommando' },
  ]
},
{
  question: "A MUTANT RAT ARMY APPROACHES. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/ratarmyresized.png",
    alt: "A swarm of oversized glowing-eyed rats charging forward" 
  },
  options: [
  { text: 'Negotiate. Even rats need HR', value: 'cockroachNegotiator' },
  { text: 'Screech louder to establish dominance', value: 'screamerScout' },
  { text: 'Summon the spirits of sewer ancestors', value: 'trashOracle' },
  { text: 'Organize a neighborhood defense grid', value: 'bureaucracyGhoul' },
  ]
},
{
  question: "A STRANGER OFFERS YOU A GLOWING MUSHROOM. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/glowingmushroom.png",
    alt: "A strange bioluminescent mushroom glowing with green light" 
  },
  options: [
  { text: 'Accept it and name it Greg', value: 'duckPainter' },
  { text: 'Decline and file a report', value: 'kaleChampion' },
  { text: 'Run away with it and laugh', value: 'hamsterWarlord' },
  { text: 'Inspect it for medicinal use', value: 'marshmallowGeneral' },
  ]
}, 
{
  question: "YOUR WEAPON OF CHOICE IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/weapon.png",
    alt: "A pile of improvised weapons scattered across a cracked floor" 
  },
  options: [
  { text: 'Clipboard with sharpened corners', value: 'bureaucracyGhoul' },
  { text: 'Healing salve with a punch', value: 'mutantHRManager' },
  { text: 'Nail bat covered in stickers', value: 'glitterButcher' },
  { text: 'Cursed ukulele', value: 'doomDJ' },
  ]
}, 
{
  question: "THE APOCALYPSE HAS TV AGAIN. YOUR SHOW?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/tv.png",
    alt: "A cracked old television flickering with static" 
  },
  options: [
  { text: '“Disaster Diaries: Planning the Panic”', value: 'apocalypseConspiracyTheorist' },
  { text: '“Survivor Support Circle”', value: 'mutantHRManager' },
  { text: '“Cooking with Roadkill”', value: 'gnocchiNomad' },
  { text: '“Whispers from the Ceiling Fan”', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "HOW DO YOU START YOUR APOCALYPSE MORNING?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/sunrise.png",
    alt: "A fiery sunrise breaking over a ruined wasteland" 
  },
  options: [
  { text: 'Inventory and affirmations', value: 'receiptGolem' },
  { text: 'Stretch, share, and hydrate', value: 'marshmallowGeneral' },
  { text: 'Scream into the mist', value: 'screamerScout' },
  { text: 'Sip tea with a ghost', value: 'skeletonBarista' },
  ]
},
{
  question: "YOU’RE INVITED TO A WASTELAND PARTY. YOUR GIFT IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/party.png",
    alt: "A flickering bonfire surrounded by scavenged party decorations" 
  },
  options: [
  { text: 'A tactical punch bowl', value: 'molotovMixologist' },
  { text: 'A box of shared memories', value: 'libraryCommando' },
  { text: 'A bag of teeth and glitter', value: 'glitterButcher' },
  { text: 'A crystal that buzzes when stared at', value: 'radioactivePhilosopher' },
  ]
}, 
{
  question: "YOU FIND A FUNCTIONAL VEHICLE. IT RUNS ON:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/vehicle.png",
    alt: "A rusted vehicle with strange tubes and glowing fuel tanks" 
  },
  options: [
  { text: 'Dried fruit and accountability', value: 'kaleChampion' },
  { text: 'Feelings and essential oils', value: 'mutantHRManager' },
  { text: 'Gremlin screams', value: 'hamsterWarlord' },
  { text: 'Dreams of the old world', value: 'origamiDetective' },
  ]
},
{
  question: "A GIANT ROBOT WANTS TO JOIN YOUR CREW. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/robot.png",
    alt: "A towering robot covered in dents and scavenged armor" 
  },
  options: [
  { text: 'Assign it as logistics coordinator', value: 'libraryCommando' },
  { text: 'Offer emotional calibration training', value: 'mutantHRManager' },
  { text: 'Paint flames on its chest', value: 'duckPainter' },
  { text: 'Ask if it dreams of rusting sheep', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU CHECK INTO THE LAST HOTEL ON EARTH. THE COMPLIMENTARY ITEM IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/hotel.png",
    alt: "A crumbling hotel lobby with dusty chandeliers" 
  },
  options: [
  { text: 'A keycard made from scrap metal', value: 'receiptGolem' },
  { text: 'A bed stuffed with old newspapers', value: 'marshmallowGeneral' },
  { text: 'A minibar full of mystery meat', value: 'gnocchiNomad' },
  { text: 'A lamp that whispers bedtime stories', value: 'skeletonBarista' },
  ]
},
{
  question: "YOU FIND A LEGENDARY WEAPON IN THE RUINS. IT IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/weapon.png",
    alt: "An ominous weapon glinting in the rubble" 
  },
  options: [
  { text: 'A sword made of melted road signs', value: 'doomDJ' },
  { text: 'A crossbow that fires angry beetles', value: 'squirrelTamer' },
  { text: 'A bat wrapped in barbed wire and rumors', value: 'glitterButcher' },
  { text: 'A gun that shoots tiny holograms of itself', value: 'origamiDetective' },
  ]
},
{
  question: "YOUR ENEMY FINALLY FALLS INTO YOUR TRAP. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/trap.png",
    alt: "A menacing pit trap surrounded by makeshift spikes" 
  },
  options: [
  { text: 'Deliver a speech so epic it becomes legend', value: 'apocalypseConspiracyTheorist' },
  { text: 'Make them clean your entire camp with a toothbrush', value: 'libraryCommando' },
  { text: 'Release a swarm of weaponized crows', value: 'animalMime' },
  { text: 'Erase them from every photo… retroactively', value: 'duckPainter' },
  ]
},
{
  question: "A DERELICT BOAT WASHES ASHORE. YOUR FIRST MOVE IS TO:",
  image: { uri: "https://raw.github.com/dboss212121/ApocalypseQuiz/main/assets/images/boat.png" },
  alt: "Tactical belt with pouches",
  options: [
  { text: 'Restore it into a seaworthy escape vessel', value: 'travelAgentOfTerror' },
  { text: 'Turn it into a floating community hub', value: 'mutantHRManager' },
  { text: 'Strip it for parts before anyone else can', value: 'glitterButcher' },
  { text: 'Sail it inland somehow, just to confuse people', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU DISCOVER AN ABANDONED POOL IN THE WASTELAND. YOUR PLAN IS TO:",
  image: { uri: "https://raw.github.com/dboss212121/ApocalypseQuiz/main/assets/images/pool.png" },
  alt: "Derelict pool",
  options: [
  { text: 'Fill it with clean water for the community', value: 'marshmallowGeneral' },
  { text: 'Grow crops in it using the deep basin', value: 'kaleChampion' },
  { text: 'Stock it with mutant fish for later snacking', value: 'gnocchiNomad' },
  { text: 'Turn it into an ominous art installation', value: 'duckPainter' },
  ]
},
{
  question: "YOU FIND A TACTICAL BELT WITH MYSTERIOUS POUCHES. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/belt.png",
    alt: "A rugged tactical belt with oddly glowing pouches" 
  },
  options: [
  { text: 'Organize survival gear with military precision', value: 'libraryCommando' },
  { text: 'Fill it with snacks for the whole squad', value: 'marshmallowGeneral' },
  { text: 'Cram it full of stolen trinkets and bones', value: 'glitterButcher' },
  { text: 'Discover one pouch contains a portal to nowhere', value: 'origamiDetective' },
  ]
},
{
  question: "CHOOSE YOUR WASTELAND COMPANION ANIMAL:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/pet.png",
    alt: "A scrappy animal companion ready for chaos" 
  },
  options: [
  { text: 'A battle-hardened goat', value: 'hamsterWarlord' },
  { text: 'A one-eyed therapy pigeon', value: 'mutantHRManager' },
  { text: 'A hairless raccoon with trust issues', value: 'animalMime' },
  { text: 'A telepathic lizard that speaks in riddles', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "A STRANGER APPROACHES YOUR CAMP. YOU DECIDE TO:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/stranger.png",
    alt: "A mysterious figure standing at the edge of your campfire light" 
  },
  options: [
  { text: 'Offer them a seat and negotiate terms', value: 'cockroachNegotiator' },
  { text: 'Share a meal and learn their story', value: 'mutantHRManager' },
  { text: 'Circle behind them and take their boots', value: 'glitterButcher' },
  { text: 'Whisper to them in a language you just made up', value: 'duckPainter' },
  ]
},
{
  question: "YOU’RE ENROLLED IN THE LAST POST-APOCALYPTIC COLLEGE. YOUR MAJOR IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/college.png",
    alt: "A dilapidated college building with banners of odd symbols" 
  },
  options: [
  { text: 'Survival Strategy and Bartering', value: 'apocalypseConspiracyTheorist' },
  { text: 'Mutant Relations and Counseling', value: 'mutantHRManager' },
  { text: 'Scavenging 101: Chaos Management', value: 'animalMime' },
  { text: 'Cryptic Arts and Oddities', value: 'origamiDetective' },
  ]
},
{
  question: "IN THE NEW ECONOMY, YOUR CURRENCY FEATURES:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/money.png",
    alt: "Crumpled bills with bizarre illustrations and symbols" 
  },
  options: [
  { text: 'A heroic figure with a duct-taped weapon', value: 'doomDJ' },
  { text: 'A pair of hands shaking over a campfire', value: 'cockroachNegotiator' },
  { text: 'A snarling rat wearing a crown', value: 'squirrelTamer' },
  { text: 'An eye that seems to follow you everywhere', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "IT’S TIME FOR A DUEL. WHAT IS YOUR SECRET WEAPON OF CHOICE?:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/duel.png",
    alt: "A dusty dueling arena with strange improvised weapons" 
  },
  options: [
  { text: 'A sharpened broom handle', value: 'libraryCommando' },
  { text: 'An aggressively worded letter', value: 'bureaucracyGhoul' },
  { text: 'Two angry raccoons tied together', value: 'animalMime' },
  { text: 'A spoon that whispers battle strategies', value: 'origamiDetective' },
  ]
},
{
  question: "WHAT’S YOUR MEAL PLAN?",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/meal.png",
    alt: "A questionable apocalypse meal served on a rusty plate" 
  },
  options: [
  { text: "Scavenge for expired granola bars", value: "gnocchiNomad" },
  { text: "Hunt mutant squirrels", value: "squirrelTamer" },
  { text: "Barter socks for canned spaghetti", value: "receiptGolem" },
  { text: "Grow mushrooms in a toilet tank", value: "kaleChampion" }
  ]
},
{
  question: "YOUR BARRICADE IS THE LAST LINE OF DEFENSE AGAINST:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/barricade.png",
    alt: "Makeshift wooden barricade stacked with junkyard debris" 
  },
  options: [
  { text: 'A horde of caffeinated squirrels', value: 'squirrelTamer' },
  { text: 'Door-to-door apocalypse salesmen', value: 'travelAgentOfTerror' },
  { text: 'A river of hot cheese', value: 'glitterButcher' },
  { text: 'Time-traveling versions of yourself', value: 'apocalypseConspiracyTheorist' },
  ]
},
{
  question: "YOUR GANG FLAG PROUDLY DISPLAYS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/flag.png",
    alt: "Tattered gang flag waving in the radioactive wind" 
  },
  options: [
  { text: 'A possum holding a sword and a grudge', value: 'hamsterWarlord' },
  { text: 'Three raccoons in a trench coat flipping pancakes', value: 'animalMime' },
  { text: 'A screaming cactus wearing sunglasses', value: 'duckPainter' },
  { text: 'An eldritch sandwich that whispers your debts', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOUR KARAOKE PERFORMANCE TONIGHT IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/karaoke.png",
    alt: "A lone microphone glowing under a flickering neon light" 
  },
  options: [
  { text: 'Screaming the Pokémon theme while being chased by a goose', value: 'screamerScout' },
  { text: 'Interpretive dance to whale sounds in full medieval armor', value: 'yodelMechanic' },
  { text: 'Yodeling “Bohemian Rhapsody” while holding a suspicious ham', value: 'doomDJ' },
  { text: 'Whisper-rapping the Bee Movie script in a smoky jazz bar', value: 'origamiDetective' },
  ]
},
{
question: "A STRANGE LIGHT APPEARS IN THE SKY. WHAT DO YOU DO?",
image: { 
  uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/light.png",
  alt: "Mysterious glowing light hovering in the night sky" },
  options: [
  { text: 'Point at it and yell “same” until it goes away', value: 'doomDJ' },
  { text: 'Start selling tickets for the “End of the World Viewing Party”', value: 'travelAgentOfTerror' },
  { text: 'Challenge it to a rap battle… and lose', value: 'animalMime' },
  { text: 'Offer it a sandwich as a peace treaty', value: 'radioactivePhilosopher' },
],
},
{
  question: "YOU HAVE A SMALL THUMB DRIVE FULL OF THE MOST IMPORTANT DATA FROM THE BEFORE TIMES. IT CONTAINS:",
  image: { uri: "https://raw.github.com/dboss212121/ApocalypseQuiz/main/assets/images/data.png" },
  alt: "Data drive",
  options: [
  { text: 'Hundreds of cat photos', value: 'receiptGolem' },
  { text: 'Recipes for different napalm flavors', value: 'molotovMixologist' },
  { text: 'Complete gibberish', value: 'apocalypseConspiracyTheorist' },
  { text: 'The script for every Jim Carrey movie', value: 'libraryCommando' },
  ]
},
{
  question: "YOU STUMBLE UPON A MYSTERIOUS PORTAL. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/portal.png",
    alt: "A swirling portal shimmering with unknown energy" 
  },
  options: [
  { text: 'Step through confidently', value: 'doomDJ' },
  { text: 'Set up a research tent', value: 'origamiDetective' },
  { text: 'Throw a rock in first', value: 'animalMime' },
  { text: 'Whisper a warning to the void', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND AN ABANDONED AMUSEMENT PARK. YOUR PLAN IS:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/park.png",
    alt: "Rusty rides and eerie carnival lights" 
  },
  options: [
  { text: 'Turn it into a fortress', value: 'travelAgentOfTerror' },
  { text: 'Organize a scavenger hunt', value: 'libraryCommando' },
  { text: 'Ride everything at full speed', value: 'hamsterWarlord' },
  { text: 'Meditate in the funhouse mirrors', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU DISCOVER A TALKING TOASTER. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/toaster.png",
    alt: "A sentient toaster blinking like it has secrets" 
  },
  options: [
  { text: 'Make it your tactical advisor', value: 'doomDJ' },
  { text: 'Teach it to make meals for the group', value: 'marshmallowGeneral' },
  { text: 'Chase it around screaming', value: 'screamerScout' },
  { text: 'Ask it about the meaning of toast', value: 'skeletonBarista' },
  ]
},
{
  question: "YOU COME ACROSS A GIANT PILE OF SOCKS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/socks.png",
    alt: "A mountain of mismatched, dusty socks" 
  },
  options: [
  { text: 'Sort them by usefulness', value: 'receiptGolem' },
  { text: 'Distribute them evenly to survivors', value: 'mutantHRManager' },
  { text: 'Build a sock fort', value: 'glitterButcher' },
  { text: 'Wear them all at once for enlightenment', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "A MYSTERIOUS FOG ROLLS IN. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/fog.png",
    alt: "Thick fog swallowing the landscape" 
  },
  options: [
  { text: 'Set up sentries and stay alert', value: 'fogMechanic' },
  { text: 'Use it to cover a supply run', value: 'travelAgentOfTerror' },
  { text: 'Run screaming into it', value: 'screamerScout' },
  { text: 'Breathe deeply and commune with spirits', value: 'trashOracle' },
  ]
},
{
  question: "YOU FIND A STRANGE MUSICAL INSTRUMENT. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/instrument.png",
    alt: "An odd instrument with glowing strings" 
  },
  options: [
  { text: 'Lead a rally with it', value: 'doomDJ' },
  { text: 'Play calming tunes for the group', value: 'cyborgCellist' },
  { text: 'Smash it loudly', value: 'molotovMixologist' },
  { text: 'Listen for cosmic messages', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU SPOT A HOVERING DRONE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/drone.png",
    alt: "A small drone hovering and scanning the area" 
  },
  options: [
  { text: 'Hack it to serve your team', value: 'apocalypseConspiracyTheorist' },
  { text: 'Follow it to discover resources', value: 'origamiDetective' },
  { text: 'Shoot it with a slingshot', value: 'animalMime' },
  { text: 'Bow respectfully', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A MYSTERIOUS CHEST IN THE DESERT. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/chest.png",
    alt: "An old chest half-buried in sand" 
  },
  options: [
  { text: 'Open it carefully and catalog contents', value: 'receiptGolem' },
  { text: 'Share the loot with allies', value: 'mutantHRManager' },
  { text: 'Kick it open violently', value: 'glitterButcher' },
  { text: 'Whisper secrets before opening', value: 'trashOracle' },
  ]
},
{
  question: "YOU ENCOUNTER A HACKER WITH STRANGE TACTICS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/hacker.png",
    alt: "A hooded figure surrounded by floating code" 
  },
  options: [
  { text: 'Recruit them for strategy', value: 'apocalypseConspiracyTheorist' },
  { text: 'Learn their techniques', value: 'origamiDetective' },
  { text: 'Mess with their system', value: 'animalMime' },
  { text: 'Ask cryptic questions', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU STUMBLE UPON A FLOATING ISLAND. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/floatingisland.png",
    alt: "A small island hovering mysteriously above the ground" 
  },
  options: [
  { text: 'Build a base atop it', value: 'neonGravedigger' },
  { text: 'Explore it for resources', value: 'travelAgentOfTerror' },
  { text: 'Jump off it recklessly', value: 'hamsterWarlord' },
  { text: 'Meditate on its floating mystery', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A GLOWING RUBBER DUCK. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/duck.png",
    alt: "A neon rubber duck floating in a puddle" 
  },
  options: [
  { text: 'Make it the team mascot', value: 'duckPainter' },
  { text: 'Use it as a morale booster', value: 'mutantHRManager' },
  { text: 'Squish it repeatedly', value: 'hamsterWarlord' },
  { text: 'Ask it for stock tips', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "A GIANT JELLO MONSTER APPROACHES. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/jello.png",
    alt: "A wobbling, translucent gelatinous creature" 
  },
  options: [
  { text: 'Negotiate a treaty', value: 'cockroachNegotiator' },
  { text: 'Feed it spare snacks', value: 'marshmallowGeneral' },
  { text: 'Punch it repeatedly', value: 'molotovMixologist' },
  { text: 'Dance with it to the music', value: 'doomDJ' },
  ]
},
{
  question: "YOU DISCOVER A HAT THAT GIVES STRANGE POWERS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/magichat.png",
    alt: "A tall hat glowing with arcane energy" 
  },
  options: [
  { text: 'Wear it and lead', value: 'neonGravedigger' },
  { text: 'Use it to help friends', value: 'mutantHRManager' },
  { text: 'Throw it into a fire', value: 'molotovMixologist' },
  { text: 'Ask it philosophical questions', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A PILE OF MYSTICAL TOAST. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/toast.png",
    alt: "Slices of glowing toast stacked in an odd pattern" 
  },
  options: [
  { text: 'Distribute it fairly', value: 'receiptGolem' },
  { text: 'Offer it to hungry survivors', value: 'marshmallowGeneral' },
  { text: 'Eat it in one bite', value: 'gnocchiNomad' },
  { text: 'Use it to predict the future', value: 'trashOracle' },
  ]
},
{
  question: "A STRANGE TUNNEL OF STUFFED ANIMALS. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/socktunnel.png",
    alt: "A twisting tunnel made entirely of socks" 
  },
  options: [
  { text: 'Map it for safe passage', value: 'travelAgentOfTerror' },
  { text: 'Use it to smuggle supplies', value: 'libraryCommando' },
  { text: 'Roll through it screaming', value: 'screamerScout' },
  { text: 'Meditate inside it', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A ROBOT BUTTERFLY. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/butterfly.png",
    alt: "A giant frowning butterfly perched on a rock" 
  },
  options: [
  { text: 'Make it your adviser', value: 'cyborgCellist' },
  { text: 'Cheer it up with gifts', value: 'mutantHRManager' },
  { text: 'Swat it angrily', value: 'animalMime' },
  { text: 'Have a philosophical debate', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "A FLOATING ICE CREAM CONE BEGS FOR HELP. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/icecream.png",
    alt: "A hovering ice cream cone with pleading eyes" 
  },
  options: [
  { text: 'Rescue it carefully', value: 'lavaLifeguard' },
  { text: 'Share it with friends', value: 'marshmallowGeneral' },
  { text: 'Eat it immediately', value: 'gnocchiNomad' },
  { text: 'Ask it about the universe', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A MYSTICAL BROOM. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/broom.png",
    alt: "A broom glowing faintly and hovering slightly" 
  },
  options: [
  { text: 'Use it to lead operations', value: 'libraryCommando' },
  { text: 'Clean the camp efficiently', value: 'marshmallowGeneral' },
  { text: 'Swing it wildly', value: 'molotovMixologist' },
  { text: 'Ask it to tell stories', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "A TALKING ROCK OFFERS YOU ADVICE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/rock.png",
    alt: "A small rock with a mouth and tiny eyes" 
  },
  options: [
  { text: 'Listen carefully', value: 'receiptGolem' },
  { text: 'Take notes', value: 'libraryCommando' },
  { text: 'Ignore it and throw it', value: 'animalMime' },
  { text: 'Ask it riddles back', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "YOU FIND A GIANT SLIPPERY BANANA. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/banana.png",
    alt: "A massive banana sliding down a hill" 
  },
  options: [
  { text: 'Use it to create a trap', value: 'cockroachNegotiator' },
  { text: 'Share it with the squad', value: 'marshmallowGeneral' },
  { text: 'Slip on it dramatically', value: 'hamsterWarlord' },
  { text: 'Meditate while balancing on it', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "A UNICORN DEMANDS PAYMENT IN GLITTER. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/unicorn.png",
    alt: "A unicorn glaring, its horn glowing like a credit card machine" 
  },
  options: [
  { text: 'Offer your entire savings account of rainbows', value: 'glitterButcher' },
  { text: 'Split the glitter bill with your party', value: 'mutantHRManager' },
  { text: 'Eat the glitter before anyone can pay', value: 'gnocchiNomad' },
  { text: 'Ask if the horn also accepts interpretive dance', value: 'duckPainter' },
  ]
},
{ 
  question: "BIGFOOT APPLIES FOR A JOB AS YOUR ROOMMATE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/bigfoot.png",
    alt: "Bigfoot holding a poorly written resume and a coffee mug" 
  },
  options: [
  { text: 'Conduct a formal roommate interview', value: 'bureaucracyGhoul' },
  { text: 'Help him polish his resume', value: 'mutantHRManager' },
  { text: 'Challenge him to wrestle for the room', value: 'hamsterWarlord' },
  { text: 'Ask if he has references from cryptids or clouds', value: 'apocalypseConspiracyTheorist' },
  ]
},
{ 
  question: "A CHUPACABRA OPENS A TACO TRUCK. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/chupacabra.png",
    alt: "A chupacabra wearing an apron, handing out tacos suspiciously" 
  },
  options: [
  { text: 'Help write a strict business plan', value: 'bureaucracyGhoul' },
  { text: 'Pass out free samples to friends', value: 'marshmallowGeneral' },
  { text: 'Bite the tacos before customers can order', value: 'gnocchiNomad' },
  { text: 'Ask if the salsa is made of moonlight and goats', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "ZOMBIES INVITE YOU TO THEIR BOOK CLUB. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/zombies.png",
    alt: "A group of zombies politely holding hardcover novels" 
  },
  options: [
  { text: 'Lead the discussion on “Brains: A Memoir”', value: 'doomDJ' },
  { text: 'Bring snacks that aren’t brains', value: 'marshmallowGeneral' },
  { text: 'Eat the book before the meeting starts', value: 'animalMime' },
  { text: 'Insist the only valid book is one written by worms', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "A VAMPIRE WANTS TO START A PODCAST. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/vampire.png",
    alt: "A vampire adjusting a microphone, avoiding its reflection in the pop filter" 
  },
  options: [
  { text: 'Offer to be the co-host and manage scheduling', value: 'doomDJ' },
  { text: 'Handle the editing and moral support', value: 'mutantHRManager' },
  { text: 'Interrupt every episode with blood-slurping ASMR', value: 'skeletonBarista' },
  { text: 'Ask if the podcast only streams at midnight', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "NESSIE EMAILS YOU A LINK TO THEIR NEW MIXTAPE. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/nessie.jpg",
    alt: "The Loch Ness monster wearing headphones, bobbing its head to beats" 
  },
  options: [
  { text: 'Promote the mixtape aggressively online', value: 'doomDJ' },
  { text: 'Add it to a shared playlist for friends', value: 'mutantHRManager' },
  { text: 'Slam-dance into the nearest lake', value: 'hamsterWarlord' },
  { text: 'Ask if the beats were recorded under the moon with kelp', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "GODZILLA APPEARS WITH A CLIPBOARD AND A SURVEY. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/godzilla.png",
    alt: "Godzilla politely adjusting glasses while holding a clipboard" 
  },
  options: [
  { text: 'Lead the survey as if you are the mayor of ruins', value: 'bureaucracyGhoul' },
  { text: 'Help tally up skyscraper satisfaction scores', value: 'receiptGolem' },
  { text: 'Eat the clipboard before any questions are asked', value: 'animalMime' },
  { text: 'Ask if destruction counts as “strongly agree” or “neutral”', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "A TRIBE OF TALKING CHEESE DEMANDS REPRESENTATION. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/cheese.png",
    alt: "A group of cheddar and brie wearing ceremonial robes, chanting" 
  },
  options: [
  { text: 'Organize their cheese council with parliamentary rules', value: 'bureaucracyGhoul' },
  { text: 'Translate their dairy hymns for outsiders', value: 'mutantHRManager' },
  { text: 'Gnaw on the elders during negotiations', value: 'gnocchiNomad' },
  { text: 'Ask if lactose intolerance is considered heresy', value: 'radioactivePhilosopher' },
  ]
},
{ 
  question: "IN A CEMETERY, A GHOST OFFERS YOU A BROKEN LAWN CHAIR. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/ghost.png",
    alt: "A translucent ghost politely holding out a cracked lawn chair among gravestones" 
  },
  options: [
  { text: 'Sit with solemn dignity and declare yourself king of the graveyard', value: 'neonGravedigger' },
  { text: 'Invite the ghost to sit while you applaud respectfully', value: 'mutantHRManager' },
  { text: 'Break the chair further and start a midnight wrestling match with shadows', value: 'hamsterWarlord' },
  { text: 'Ask the chair if it remembers its tree-life before death', value: 'radioactivePhilosopher' },
  ]
},
{
  question: "IN THE DESERT, YOU FIND A TREASURE CHEST HALF-BURIED IN DUNES. IT HUMS A COUNTRY SONG. YOU:",
  image: { 
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/treasure.png",
    alt: "A weathered treasure chest jutting from golden sand under a blazing sun, faint musical notes rising from it" 
  },
  options: [
  { text: 'Climb atop it and proclaim yourself Sheriff of Sand Dollars', value: 'travelAgentOfTerror' },
  { text: 'Fan the chest with palm fronds and whisper “you’re doing great, buddy”', value: 'marshmallowGeneral' },
  { text: 'Punch the dunes until a scorpion agrees to fight in your honor', value: 'animalMime' },
  { text: 'Ask the chest whether it prefers tumbleweeds or tax audits', value: 'apocalypseConspiracyTheorist' },
  ]
},
{
  question: "IN THE RUINS OF A FORMER LASER TAG ARENA, YOU FIND A BOMB DISGUISED AS A VENDING MACHINE. IT WHISPERS YOUR CHILDHOOD NICKNAME. YOU:",
  image: {
    uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/defuse.png",
    alt: "A dusty vending machine with exposed wires and blinking lights, surrounded by cracked neon walls and scorched arcade carpet"
  },
  options: [
    { text: "Insert a coupon for ‘One Free Existential Crisis’ and wait for it to vend enlightenment", "value": "couponSaboteur" },
    { text: "Challenge the bomb to a staring contest and lose dramatically", "value": "eyeballDiplomat" },
    { text: "Recite the alphabet backwards while juggling expired batteries", "value": "entropyEntertainer" },
    { text: "Offer it a friendship bracelet made of spaghetti and hope for detente", "value": "noodleNegotiator" }
  ]
}

  // Add more questions in same format...
];
const roles = {
  trashOracle: {
    description: 'Trash Oracle - Reads the future in garbage. Mysterious and oddly accurate.',
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/Oracle.png" },
  },
  mutantHRManager: {
    description: 'Mutant HR Manager - Resolves conflict with tasers and empathy.',
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/MutantHR.png" },
  },
  screamerScout: {
    description: 'Screamer Scout - Screams first, thinks later. Often right.',
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/dancer.png" },
  },
  bureaucracyGhoul: {
    description: "Bureaucracy Ghoul - Feeds on paperwork and thrives in long lines. Stamps documents with sinister precision.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/bureaucracyGhoul.png" },
  },
  kaleChampion: {
    description: "Kale Champion - Armored in leafy resilience. Bitter, righteous, and impossible to wilt.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/kaleChampion.png" },
  },
  fogMechanic: {
    description: "Fog Mechanic - Fixes broken mists and tunes eerie atmospheres. Works only at dawn.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/fogMechanic.png" },
  },
  skeletonBarista: {
    description: "Skeleton Barista - Serves bone-dry lattes. Milk froth screams faintly.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/skeletonBarista.png" },
  },
  neonGravedigger: {
    description: "Neon Gravedigger - Digs glowing graves that double as nightclubs. Morbid, yet festive.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/neonGravedigger.png" },
  },
  hamsterWarlord: {
    description: "Hamster Warlord - Commands an army of squeaky, wheel loving rodents. Tiny, fluffy, unstoppable.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/hamsterWarlord.png" },
  },
  balloonNecromancer: {
    description: "Balloon Necromancer – Summons the dead with squeaky inflatables and helium whispers.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/balloonNecromancer.png" },
  },
  cockroachNegotiator: {
    description: "Cockroach Negotiator – Brokers peace treaties with indestructible insects over crumbs of power.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/cockroachNegotiator.png" },
  },
  cyborgCellist: {
    description: "Cyborg Cellist – Performs haunting symphonies on titanium strings while sparks fly from the bow.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/cyborgCellist.png" },
  },
  libraryCommando: {
    description: "Library Commando – Shushes enemies with militant silence and overdue-book fines.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/libraryCommando.png" },
  },
  doomDJ: {
    description: "Doom DJ – Spins tracks that summon thunder, collapse buildings, and start dance-offs with the void.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/doomDJ.png" },
  },
  duckPainter: {
    description: "Duck Painter – Covers the wasteland in murals of ducks that seem to stare back a little too knowingly.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/duckPainter.png" },
  },
  glitterButcher: {
    description: "Glitter Butcher – Leaves every battlefield sparkling, fabulous, and disturbingly sticky.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/glitterButcher.png" },
  },
  gnocchiNomad: {
    description: "Gnocchi Nomad – Wanders deserts with pockets full of potato pasta, feeding the hungry and confusing the rest.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/gnocchiNomad.png" },
  },
  lavaLifeguard: {
    description: "Lava Lifeguard – Blows a whistle at volcanoes and dives into magma to save screaming skeletons.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/lavaLifeguard.png" },
  },
  marshmallowGeneral: {
    description: "Marshmallow General – Commands gooey troops that roast enemies alive, slowly and deliciously.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/marshmallowGeneral.png" },
  },
  animalMime: {
    description: "Animal Mime – Mimics beasts so convincingly that predators applaud, then eat the audience.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/animalMime.png" },
  },
  molotovMixologist: {
    description: "Molotov Mixologist – Crafts cocktails that light up the night, garnished with chaos and a twist of lime.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/molotovMixologist.png" },
  },
  origamiDetective: {
    description: "Origami Detective – Folds clues into cranes, swans, and confessions that solve themselves.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/origamiDetective.png" },
  },
  radioactivePhilosopher: {
    description: "Radioactive Philosopher – Glows in the dark while pondering whether fallout has meaning.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/radioactivePhilosopher.png" },
  },
  receiptGolem: {
    description: "Receipt Golem – Born from endless shopping slips, remembers every purchase, judges all of them.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/receiptGolem.png" },
  },
  squirrelTamer: {
    description: "Squirrel Tamer – Bends armies of twitchy rodents to their will with acorn diplomacy.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/squirrelTamer.png" },
  },
  apocalypseConspiracyTheorist: {
    description: "Apocalypse Conspiracy Theorist – Knew it all along, explains it with 48 corkboards and zero evidence.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/apocalypseConspiracyTheorist.png" },
  },
  yodelMechanic: {
    description: "Yodel Mechanic – Fixes broken engines by singing so loud pistons weep oil in gratitude.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/yodelMechanic.png" },
  },
  travelAgentOfTerror: {
    description: "Travel Agent of Terror – Books scenic vacations to sinkholes, haunted malls, and endless bureaucracy lines.",
    image: { uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/travelAgentOfTerror.png" },
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
  const scrollY = useRef(new Animated.Value(400)).current; // start lower
  const [quizSound, setQuizSound] = useState(null);
  const [creditsSound, setCreditsSound] = useState(null);
  const [titleSound, setTitleSound] = useState(null); // title/menu music
  const [secretSound, setSecretSound] = useState(null);
  const [secretResultSound, setSecretResultSound] = useState(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [secretClicks, setSecretClicks] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretBoxTaps, setSecretBoxTaps] = useState([false, false, false, false]);
  const [secretStage, setSecretStage] = useState(1); // 1 = first page, 2 = second page
  const [isMuted, setIsMuted] = useState(false);

const previousModeRef = useRef(null);

useEffect(() => {
  if (mode === "basic" || mode === "advanced" || mode === "full") {
    previousModeRef.current = mode; // store last quiz mode
  }
}, [mode]);

  // --- music pause/resume on mute ---
const toggleMute = async () => {
  const newMuted = !isMuted; // compute new state
  setIsMuted(newMuted);

  const allSounds = [titleSound, quizSound, creditsSound];
  for (let s of allSounds) {
    if (!s) continue;

    const status = await s.getStatusAsync();
    if (!status.isLoaded) continue;

    if (newMuted) {
      // pause if muted
      if (status.isPlaying) await s.pauseAsync();
    } else {
      // resume if unmuted
      if (!status.isPlaying) await s.playAsync();
    }
  }
};

  // --- universal mute button ---
const MuteButton = () => (
  <TouchableOpacity
    onPress={toggleMute}
    style={{
      position: "absolute",
      bottom: 20,
      left: 20,
      width: 60,
      height: 50,
      zIndex: 1000,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Retro speaker triangle pointing left */}
    <View style={{
      width: 0,
      height: 0,
      borderTopWidth: 12,
      borderBottomWidth: 12,
      borderRightWidth: 20,
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: "#00FF00",
      position: "absolute",
      left: 10,
    }} />

    {/* Sound waves (centered vertically on triangle, with slight gap) */}
    {!isMuted && (
      <>
        <View style={{
          width: 2,
          height: 6,
          backgroundColor: "#00FF00",
          position: "absolute",
          left: 34,
          top: 22, // shifted down
        }} />
        <View style={{
          width: 2,
          height: 10,
          backgroundColor: "#00FF00",
          position: "absolute",
          left: 40,
          top: 20,
        }} />
        <View style={{
          width: 2,
          height: 14,
          backgroundColor: "#00FF00",
          position: "absolute",
          left: 46,
          top: 18,
        }} />
      </>
    )}

    {/* Two red lines forming an X when muted */}
    {isMuted && (
      <>
        <View style={{
          width: 35,
          height: 2,
          backgroundColor: "#FF0000",
          position: "absolute",
          transform: [{ rotate: "45deg" }],
        }} />
        <View style={{
          width: 35,
          height: 2,
          backgroundColor: "#FF0000",
          position: "absolute",
          transform: [{ rotate: "-45deg" }],
        }} />
      </>
    )}
  </TouchableOpacity>
);



// =======================
// SECRET PROGRESS BAR COMPONENT
// =======================
const SecretProgressBar = ({ currentSecretIndex, onComplete }) => {
  const [progress, setProgress] = useState(0);

  const handlePress = () => {
    // Only clickable on the 3rd secret question (index 2)
    if (currentSecretIndex !== 2) return;
    if (progress < 5) {
      const newProgress = progress + 1;
      setProgress(newProgress);
      if (newProgress === 5) {
        onComplete(); // trigger secret win
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={currentSecretIndex === 2 ? 0.8 : 1}
      onPress={handlePress}
      style={styles.secretProgressContainer}
    >
      <View style={styles.secretProgressBackground}>
        <View style={[styles.secretProgressFill, { flex: progress }]} />
        <View style={{ flex: 5 - progress }} />
      </View>
    </TouchableOpacity>
  );
};


const confirmQuit = () => {
  setExitWarningVisible(true);
};

// play title/menu music
async function playTitleMusic() {
  if (titleSound) {
    // Already exists, just resume if paused
    const status = await titleSound.getStatusAsync();
    if (!status.isPlaying) {
      await titleSound.playAsync();
    }
    return;
  }

  const { sound } = await Audio.Sound.createAsync(
    require('./assets/music/TLPR.mp3'),
    { isLooping: true, shouldPlay: true }
  );
  setTitleSound(sound);
  await sound.playAsync();
}

// helper: play quiz music
async function playQuizMusic() {
  const { sound } = await Audio.Sound.createAsync(
    require('./assets/music/LPME.mp3'),
    { isLooping: true, shouldPlay: true }
  );
  setQuizSound(sound);
  await sound.playAsync();
}

// helper: play credits music
async function playCreditsMusic() {
  const { sound } = await Audio.Sound.createAsync(
    require('./assets/music/TLCKMD.mp3'), // 👈 add your credits song here
    { isLooping: true, shouldPlay: true }
  );
  setCreditsSound(sound);
  await sound.playAsync();
}

async function playSecretMusic() {
  const { sound } = await Audio.Sound.createAsync(
    require("./assets/music/TLTV.mp3"), // replace with your actual file
    { isLooping: true, shouldPlay: true }
  );
  setSecretSound(sound);
  await sound.playAsync();
}
// helper: play secret result music
async function playSecretResultMusic() {
  const { sound } = await Audio.Sound.createAsync(
    require('./assets/music/TLA.mp3'), // 👈 put your file in /assets/music
    { isLooping: true, shouldPlay: true }
  );
  setSecretResultSound(sound);
  await sound.playAsync();
}

// clean up function
async function stopAllMusic() {
  if (titleSound) {
    await titleSound.stopAsync();
    await titleSound.unloadAsync();
    setTitleSound(null);
  }
  if (quizSound) {
    await quizSound.stopAsync();
    await quizSound.unloadAsync();
    setQuizSound(null);
  }
  if (creditsSound) {
    await creditsSound.stopAsync();
    await creditsSound.unloadAsync();
    setCreditsSound(null);
  }
  if (secretSound) {
    await secretSound.stopAsync();
    await secretSound.unloadAsync();
    setSecretSound(null);
  }
  if (secretResultSound) {
    await secretResultSound.stopAsync();
    await secretResultSound.unloadAsync();
    setSecretResultSound(null);
  }
}

// music control effect
useEffect(() => {
  let isMounted = true;

  const handleMusic = async () => {
    if (!isMounted) return;

    // Decide what music should play
    let desiredTrack = null;
    if (mode === "basic" || mode === "advanced" || mode === "full") {
      desiredTrack = "quiz";
    } else if (mode === "credits") {
      desiredTrack = "credits";
    } else if (mode === "secret" && secretStage < 4) {
      desiredTrack = "secret"; // secret levels 1–3
    } else if (mode === "secret" && secretStage === 4) {
      desiredTrack = "secretResult"; // secret result
    } else if (mode === null) {
      desiredTrack = "title";
    }

    // Stop anything that is playing but isn’t desired
    if (desiredTrack !== "title" && titleSound) {
      await titleSound.stopAsync();
      await titleSound.unloadAsync();
      setTitleSound(null);
    }
    if (desiredTrack !== "quiz" && quizSound) {
      await quizSound.stopAsync();
      await quizSound.unloadAsync();
      setQuizSound(null);
    }
    if (desiredTrack !== "credits" && creditsSound) {
      await creditsSound.stopAsync();
      await creditsSound.unloadAsync();
      setCreditsSound(null);
    }
    if (desiredTrack !== "secret" && secretSound) {
      await secretSound.stopAsync();
      await secretSound.unloadAsync();
      setSecretSound(null);
    }
    if (desiredTrack !== "secretResult" && secretResultSound) {
      await secretResultSound.stopAsync();
      await secretResultSound.unloadAsync();
      setSecretResultSound(null);
    }

    // Start the desired track if not muted
    if (isMuted) return; // <--- skip starting music if muted

    if (desiredTrack === "title" && !titleSound) await playTitleMusic();
    else if (desiredTrack === "quiz" && !quizSound) await playQuizMusic();
    else if (desiredTrack === "credits" && !creditsSound) await playCreditsMusic();
    else if (desiredTrack === "secret" && !secretSound) await playSecretMusic();
    else if (desiredTrack === "secretResult" && !secretResultSound) await playSecretResultMusic();
  };

  handleMusic();

  return () => {
    isMounted = false;
  };
}, [mode, isMuted, secretStage]);

// Credit Effects
useEffect(() => {
  if (mode === "credits" && contentHeight > 0) {
    const screenHeight = Dimensions.get("window").height;

    // Start just below the bottom edge
    scrollY.setValue(screenHeight - contentHeight);

    // total distance to travel (from bottom of screen to fully off top)
    const distance = contentHeight + screenHeight;

    // desired speed in pixels per second
    const speed = 50; // 👈 adjust this value to make it faster/slower

    // duration in ms = distance / speed * 1000
    const duration = (distance / speed) * 1000;

    Animated.timing(scrollY, {
      toValue: -contentHeight,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }
}, [mode, contentHeight]);

  useEffect(() => {
    if (mode) {
      let num = mode === 'basic' ? 10 : mode === 'advanced' ? 20 : 30;
      setQuizQuestions(getRandomQuestions(num));
    }
  }, [mode]);

const getRandomQuestions = (num) => {
  const copy = [...allQuestions];

  // Fisher–Yates shuffle
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  // Only take as many as needed
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

if (mode === "credits") {
  return (
    <ScrollView contentContainerStyle={[styles.fullScreenContainer, { position: 'relative' }]}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>CREDITS</Text>
      </View>

      {/* Animated Credits Block */}
      <View style={styles.creditsContainer}>
        <Animated.View style={{ transform: [{ translateY: scrollY }] }}>
          <View
            onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
            style={styles.creditsInner}
          >
            <Text style={styles.creditsText}>
              {"Developed by: You\n\nArt: Your Team\n\nSpecial Thanks: Players like you\n\nAnd anyone else you want to list..."}
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => setMode(null)}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {/* Mute Button */}
      <MuteButton />
    </ScrollView>
  );
}

  // ===== Mode Selection =====
  if (!mode) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text style={styles.header}>CHOOSE YOUR APOCALYPSE QUIZ MODE</Text>
        <TouchableOpacity style={styles.button} onPress={() => setMode('basic')}><Text style={styles.buttonText}>BASIC (10 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('advanced')}><Text style={styles.buttonText}>ADVANCED (20 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('full')}><Text style={styles.buttonText}>FULL EVALUATION (30 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.creditsButton} onPress={() => setMode("credits")}><Text style={styles.buttonText}>Credits</Text></TouchableOpacity>

    {/* --- Universal Mute Button --- */}
    <MuteButton />

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
  
// ===== Secret Screen (Stage 1) =====
if (mode === "secret" && secretStage === 1) {
  const handleBoxPress = (index) => {
    const next = [...secretBoxTaps];
    next[index] = true;
    setSecretBoxTaps(next);
    if (next.every(Boolean)) setSecretStage(2);
  };

  const handleSecretAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setMode(previousModeRef.current);
    } else {
      setShowResult(true);
      setMode(previousModeRef.current);
    }
  };

  // Instead of returning here, render inside main component JSX
  return (
    <ScrollView contentContainerStyle={styles.fullScreenContainer}>
      <Text style={styles.header}>{"THE AIR GOES QUIET. WHAT DO YOU DO?"}</Text>
      <Image
        source={{ uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/thedoor.png" }}
        style={styles.image}
      />
      {[
        { text: "Hold your breath and wait", value: "doomDJ" },
        { text: "Signal your crew to regroup", value: "mutantHRManager" },
        { text: "Sprint toward the sound", value: "screamerScout" },
        { text: "Hum back at the horizon", value: "trashOracle" },
      ].map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => handleSecretAnswer(opt.value)}
        >
          <Text style={styles.buttonText}>{opt.text}</Text>
        </TouchableOpacity>
      ))}

      {/* Invisible corner “decor” boxes */}
      <View pointerEvents="box-none" style={styles.secretOverlay}>
        {[0, 1, 2, 3].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleBoxPress(i)}
            style={[
              styles.cornerBox,
              i === 0 && styles.tl,
              i === 1 && styles.tr,
              i === 2 && styles.bl,
              i === 3 && styles.br,
              secretBoxTaps[i] && styles.cornerBoxActive,
            ]}
          />
        ))}
      </View>

      {/* SECRET PROGRESS BAR (static in Stage 1) */}
      <SecretProgressBar currentSecretIndex={-1} onComplete={() => {}} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setMode(previousModeRef.current)}
      >
        <Text style={styles.buttonText}>QUIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ===== Secret Screen (Stage 2) =====
if (mode === "secret" && secretStage === 2) {
  const handleSecretAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setMode(previousModeRef.current);
    } else {
      setShowResult(true);
      setMode(previousModeRef.current);
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      <Text style={styles.header}>{"THE HORIZON SHIFTS. WHAT'S YOUR MOVE?"}</Text>
      <Image
        source={{ uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/secretroom.png" }}
        style={styles.image}
      />

      {[
        { text: "Step cautiously forward", value: "doomDJ" },
        { text: "Observe silently", value: "mutantHRManager" },
        { text: "Run toward the light", value: "screamerScout" },
        { text: "Call out a strange sound", value: "trashOracle" },
      ].map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => handleSecretAnswer(opt.value)}
        >
          <Text style={styles.buttonText}>{opt.text}</Text>
        </TouchableOpacity>
      ))}

      {/* Corner aesthetic boxes */}
      <View pointerEvents="box-none" style={styles.secretOverlay}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.cornerBox,
              i === 0 && styles.tl,
              i === 1 && styles.tr,
              i === 2 && styles.bl,
              i === 3 && styles.br,
            ]}
          />
        ))}
      </View>

      {/* Secret progress bar (static) */}
      <SecretProgressBar currentSecretIndex={-1} onComplete={() => {}} />

      {/* "Leave" button advances to secretStage 3 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSecretStage(3)}
      >
        <Text style={styles.buttonText}>Leave</Text>
      </TouchableOpacity>
    </View>
  );
}

// ===== Secret Screen (Stage 3) =====
if (mode === "secret" && secretStage === 3) {
  const handleSecretAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setMode(previousModeRef.current);
    } else {
      setShowResult(true);
      setMode(previousModeRef.current);
    }
  };

  const handleProgressComplete = () => {
    // Show secret final results page
    setSecretStage(4); // stage 4 = secret results page
  };

  return (
    <ScrollView contentContainerStyle={styles.fullScreenContainer}>
      <Text style={styles.header}>{"A STRANGE ENERGY SURROUNDS YOU. WHAT DO YOU DO?"}</Text>
      <Image
        source={{ uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/agents.png" }}
        style={styles.image}
      />

      {[
        { text: "Step boldly forward", value: "doomDJ" },
        { text: "Wait and watch", value: "mutantHRManager" },
        { text: "Leap toward the source", value: "screamerScout" },
        { text: "Whisper a strange chant", value: "trashOracle" },
      ].map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => handleSecretAnswer(opt.value)}
        >
          <Text style={styles.buttonText}>{opt.text}</Text>
        </TouchableOpacity>
      ))}

      {/* Corner aesthetic boxes */}
      <View pointerEvents="box-none" style={styles.secretOverlay}>
        {[0, 1, 2, 3].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {}}
            style={[
              styles.cornerBox,
              i === 0 && styles.tl,
              i === 1 && styles.tr,
              i === 2 && styles.bl,
              i === 3 && styles.br,
            ]}
          />
        ))}
      </View>

      {/* Secret progress bar (interactive) */}
      <SecretProgressBar currentSecretIndex={2} onComplete={handleProgressComplete} />

      {/* Normal "Quit" button */}
      <TouchableOpacity style={styles.button} onPress={() => setMode(previousModeRef.current)}>
        <Text style={styles.buttonText}>Quit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ===== Secret Screen (Stage 4 - Final Results) =====
if (mode === "secret" && secretStage === 4) {
  return (
    <ScrollView contentContainerStyle={styles.fullScreenContainer}>
      <Text style={styles.header}>{"🏆 YOU BEAT MY APP 🏆"}</Text>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/dboss212121/ApocalypseQuiz/main/assets/images/utopia.png",
        }}
        style={styles.image}
      />
      <Text style={styles.creditsText}>
        {"Against all odds, you found the hidden path and conquered it."}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setMode(null);    // back to mode select
          setSecretStage(1);    // reset secret stages
          setSecretBoxTaps([false, false, false, false]);
          setSecretProgress(0); // reset progress bar
          setCurrentQuestion(0);
          setAnswers([]);
          setShowResult(false);
          setProgress(0);
        }}
      >
        <Text style={styles.buttonText}>BACK TO QUIZ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

  // ===== Mode Selection =====
  if (!mode) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text style={styles.header}>CHOOSE YOUR APOCALYPSE QUIZ MODE</Text>
        <TouchableOpacity style={styles.button} onPress={() => setMode('basic')}><Text style={styles.buttonText}>BASIC (10 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('advanced')}><Text style={styles.buttonText}>ADVANCED (20 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('full')}><Text style={styles.buttonText}>FULL EVALUATION (30 Qs)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.creditsButton} onPress={() => setMode("credits")}><Text style={styles.buttonText}>Credits</Text></TouchableOpacity>
      </View>
    );
  }

  // ===== Quiz Screen =====
  const q = quizQuestions[currentQuestion] ?? {};
  const progress = Math.round(((currentQuestion) / quizQuestions.length) * 100);

return (
  <ScrollView contentContainerStyle={styles.fullScreenContainer}>
    <Text style={styles.header}>{q.question}</Text>
{q.image && (
  <TouchableOpacity
    onPress={() => {
      const newCount = secretClicks + 1;
      setSecretClicks(newCount);

      if (newCount >= 5) {
        setSecretUnlocked(true);
        setMode("secret"); // 👈 trigger secret mode
        setSecretClicks(0); // optional reset
      }
    }}
  >
    <Image 
      source={{ uri: q.image.uri }} 
      style={styles.image} 
    />  
    </TouchableOpacity>
)}
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
          <Text style={styles.buttonText}>ARE YOU SURE YOU WANT TO QUIT AND LOSE ALL PROGRESS?</Text>
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

        {/* --- Universal Mute Button --- */}
    <MuteButton />

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
    justifyContent: 'flex-start', // 👈 prevents layout stretch
    width: '100%',
    maxWidth: Dimensions.get('window').width > 1000 ? 1000 : '100%',
    marginHorizontal: 'auto',
    position: 'relative',
  },
  header: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    color: '#00ff00',
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    flexShrink: 1,
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
scrollContainer: {
  padding: 20,
  alignItems: "center",
},
creditItem: {
  fontSize: 16,
  color: "white",
  marginBottom: 10,
  textAlign: "center",
},
creditsButton: {
  position: "absolute",
  bottom: 20,
  right: 20,
  paddingVertical: 8,
  paddingHorizontal: 14,
  backgroundColor: "#333", // dark background
  borderRadius: 8,
},
creditsText: {
  fontSize: 20,
  color: '#00FF00', // 👈 neon green like your buttons
  textAlign: 'center',
  lineHeight: 28,
    fontFamily: 'press-start',
},

secretOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  maxWidth: '100%',
  maxHeight: '100%',
  zIndex: 10,
},

cornerBox: {
  position: "absolute",
  width: 26,
  height: 26,
  borderWidth: 2,
  borderColor: "#00ff00",
  borderRadius: 6,
  backgroundColor: "transparent",   // looks like UI chrome
  opacity: 0.65,                     // subtle so it feels decorative
},

cornerBoxActive: {
  opacity: 1,
  backgroundColor: "rgba(0,255,0,0.12)", // tiny feedback when tapped
},

tl: { top: 12, left: 12 },
tr: { top: 12, right: 12 },
bl: { bottom: 12, left: 12 },
br: { bottom: 12, right: 12 },

secretProgressContainer: {
  marginVertical: 12,
  width: '90%',
  alignSelf: 'center',
},
secretProgressBackground: {
  flexDirection: 'row',
  height: 20,
  backgroundColor: '#001133',
  borderColor: '#33bbff',
  borderWidth: 2,
  borderRadius: 8,
  shadowColor: '#33bbff',
  shadowOpacity: 0.8,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 0 },
  overflow: 'hidden',
},
secretProgressFill: {
  backgroundColor: '#00ccff',
  borderRightWidth: 1,
  borderRightColor: '#003366',
},

headerWrapper: {
  width: '100%',
  maxWidth: 500,
  alignSelf: 'center',
  paddingHorizontal: 12,
},

creditsContainer: {
  overflow: 'hidden',
  width: '100%',
  maxWidth: 500,
  marginHorizontal: 'auto',
  height: 300,
  alignSelf: 'center',
},

creditsInner: {
  margin: 0,
  padding: 0,
  width: '100%',
  maxWidth: 500,
  alignSelf: 'center',
},

creditsText: {
  fontSize: 16,
  lineHeight: 24,
  color: '#89ebfcff',
  textAlign: 'center',
  paddingHorizontal: 12,
  flexShrink: 1,
  width: '100%',
  maxWidth: 500,
  alignSelf: 'center',
},

});
