import { View, Text, Image, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";
import { useRouter } from "expo-router";
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
} from "react-native-reanimated";

import beachImage from "@/assets/meditation-images/beach.webp";
import { Feather } from '@expo/vector-icons';

const App = () => {
    const router = useRouter();
    const breatheAnimation = useSharedValue(1);

    useEffect(() => {
        breatheAnimation.value = withRepeat(
            withTiming(1.2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: breatheAnimation.value }],
        };
    });

    return (
        <View className="flex-1">
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient
                    colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
                >
                    <SafeAreaView className="flex flex-1 px-4 justify-between">
                        <Animated.View
                            entering={FadeInDown.delay(300).duration(1000)}
                            className="items-center mt-10"
                        >
                            <Animated.View style={animatedStyle}>
                                <Feather name="sun" size={60} color="white" />
                            </Animated.View>
                            <Text className="text-center text-white font-bold text-5xl mt-4">
                                Aora
                            </Text>
                            <Text className="text-center text-white font-light text-xl mt-3 px-6">
                                Your Journey to Inner Peace Begins Here
                            </Text>
                        </Animated.View>

                        <Animated.View
                            entering={FadeInUp.delay(600).duration(1000)}
                            className="mb-10"
                        >
                            <Text className="text-white text-center mb-6 text-lg font-light">
                                Experience tranquility in every breath
                            </Text>
                            <CustomButton
                                onPress={() => router.push("/nature-meditate")}
                                title="Begin Your Journey"
                                className="bg-white rounded-full py-4"
                                textClassName="text-blue-500 font-semibold text-lg"
                            />
                        </Animated.View>

                        <StatusBar style="light" />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default App;