  // --- music pause/resume on mute ---
const toggleMute = async () => {
  const newMuted = !isMuted;
  setIsMuted(newMuted);

  const allSounds = [
    { sound: titleSound, name: "title" },
    { sound: quizSound, name: "quiz" },
    { sound: creditsSound, name: "credits" },
    { sound: secretSound, name: "secret" },
    { sound: secretResultSound, name: "secretResult" },
  ];

  // Pause all loaded sounds on mute
  if (newMuted) {
    for (let { sound } of allSounds) {
      if (!sound) continue;
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.pauseAsync();
      }
    }
    return; // done
  }

  // Unmuting: determine desired track
  let desiredTrack = null;
  if (["basic", "advanced", "full"].includes(mode)) desiredTrack = "quiz";
  else if (mode === "credits") desiredTrack = "credits";
  else if (mode === "secret" && secretStage < 4) desiredTrack = "secret";
  else if (mode === "secret" && secretStage === 4) desiredTrack = "secretResult";
  else desiredTrack = "title";

  // Resume or re-init only the desired track
  const track = allSounds.find(t => t.name === desiredTrack);
  if (track?.sound) {
    const status = await track.sound.getStatusAsync();
    if (status.isLoaded && !status.isPlaying) {
      await track.sound.playAsync();
    }
  } else {
    // If not loaded, re-init
    if (desiredTrack === "title") await playTitleMusic();
    else if (desiredTrack === "quiz") await playQuizMusic();
    else if (desiredTrack === "credits") await playCreditsMusic();
    else if (desiredTrack === "secret") await playSecretMusic();
    else if (desiredTrack === "secretResult") await playSecretResultMusic();
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
  // If sound already exists
  if (titleSound) {
    const status = await titleSound.getStatusAsync();
    if (!status.isLoaded) {
      await titleSound.loadAsync(require('./assets/music/TLPR.mp3'), { isLooping: true });
    }
    if (!status.isPlaying && !isMuted) {
      await titleSound.playAsync();
    }
    return;
  }

  // Create and store new sound
  const { sound } = await Audio.Sound.createAsync(
    require('./assets/music/TLPR.mp3'),
    { isLooping: true, shouldPlay: !isMuted } // only auto-play if not muted
  );
  setTitleSound(sound);

  // If muted, don’t play yet
  if (!isMuted) {
    await sound.playAsync();
  }
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

useEffect(() => {
  const enableTitleMusic = async () => {
    if (!isMuted && !titleSound) {
      await playTitleMusic();
    }
  };

  const listener = () => {
    enableTitleMusic();
    document.removeEventListener('click', listener);
  };

  document.addEventListener('click', listener);

  return () => document.removeEventListener('click', listener);
}, []);

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

const lastTrackRef = useRef(null);

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

    // Only stop/unload tracks that are not the desired one
    const stopPromises = [];
    if (desiredTrack !== "title" && titleSound) stopPromises.push(titleSound.stopAsync().then(() => titleSound.unloadAsync()).then(() => setTitleSound(null)));
    if (desiredTrack !== "quiz" && quizSound) stopPromises.push(quizSound.stopAsync().then(() => quizSound.unloadAsync()).then(() => setQuizSound(null)));
    if (desiredTrack !== "credits" && creditsSound) stopPromises.push(creditsSound.stopAsync().then(() => creditsSound.unloadAsync()).then(() => setCreditsSound(null)));
    if (desiredTrack !== "secret" && secretSound) stopPromises.push(secretSound.stopAsync().then(() => secretSound.unloadAsync()).then(() => setSecretSound(null)));
    if (desiredTrack !== "secretResult" && secretResultSound) stopPromises.push(secretResultSound.stopAsync().then(() => secretResultSound.unloadAsync()).then(() => setSecretResultSound(null)));

    await Promise.all(stopPromises);

    // Start only the correct track for the mode, and only if not muted and not already started
    if (isMuted) {
      lastTrackRef.current = null;
      return;
    }

    if (lastTrackRef.current === desiredTrack) return; // already started
    lastTrackRef.current = desiredTrack;

    if (desiredTrack === "title") await playTitleMusic();
    else if (desiredTrack === "quiz") await playQuizMusic();
    else if (desiredTrack === "credits") await playCreditsMusic();
    else if (desiredTrack === "secret") await playSecretMusic();
    else if (desiredTrack === "secretResult") await playSecretResultMusic();
  };

  handleMusic();

  return () => {
    isMounted = false;
  };
}, [mode, isMuted, secretStage, titleSound, quizSound, creditsSound, secretSound, secretResultSound]);
