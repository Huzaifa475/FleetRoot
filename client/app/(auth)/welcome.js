import { View, Text, Image, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';

const welcome = () => {
    return (
        <SafeAreaView style={styles.welcomeContainer}>
            <View style={styles.welcomeTopContainer}>
                <LinearGradient
                    colors={[
                        'rgb(255,230,230)',  
                        'rgb(224,254,255)', 
                        'rgb(255,235,207)',  
                    ]}
                    locations={[0, 0.35, 1]} 
                    start={{ x: -0.3, y: 1 }}
                    end={{ x: 1.5, y: 0.5 }}
                    style={styles.welcomeTopContainerBackground}
                >
                    <Image
                        source={require('../../assets/images/thankyou.png')}
                        style={styles.welcomeTopImage}
                    />
                    <Text style={styles.welcomeHeaderText}>Thank you!</Text>
                    <Text style={styles.welcomeText}>We've received your request for a free trial.Our team will contact you soon!</Text>
                </LinearGradient>
            </View>
            <View style={styles.welcomeBottomContainer}>
                <View style={styles.welcomeHeaderContainer}>
                    <Text style={styles.welcomeHeaderText}>Get Started</Text>
                    <Text style={styles.welcomeText}>Watch below video to know us</Text>
                </View>
                <View style={styles.welcomeCards}>
                    <View style={styles.welcomeCard}>
                        <View style={styles.welcomeCardImageContainer}>
                            <Image 
                                src='https://cdn.pixabay.com/photo/2023/12/23/16/12/dark-8465890_640.jpg'
                                style={styles.welcomeCardImage}
                            />
                        </View>
                        <View style={styles.welcomeCardContent}>
                            <Text style={styles.welcomeCardContentHeaderText}>Lorem ipsum Video Title here</Text>
                            <Text style={styles.welcomeCardContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore </Text>
                        </View>
                    </View>
                    <View style={styles.welcomeCard}>
                        <View style={styles.welcomeCardImageContainer}>
                            <Image 
                                src='https://cdn.pixabay.com/photo/2023/12/23/16/12/dark-8465890_640.jpg'
                                style={styles.welcomeCardImage}
                            />
                        </View>
                        <View style={styles.welcomeCardContent}>
                            <Text style={styles.welcomeCardContentHeaderText}>Lorem ipsum Video Title here</Text>
                            <Text style={styles.welcomeCardContentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.welcomeButtonContainer}>
                    <TouchableOpacity style={styles.welcomeButton}>
                        <Text style={styles.welcomeButtonText}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1
    },
    welcomeTopContainer: {
        flex: 2/5
    },
    welcomeTopContainerBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    },
    welcomeTopImage: {
        width: 100,
        height: 100
    },
    welcomeHeaderText: {
        fontSize: 30,
        fontWeight: "900"
    },
    welcomeText: {
        fontSize: 20,
        color: "#d4d2d2",
        fontWeight: "500",
        textAlign: "center"
    },  
    welcomeBottomContainer: {
        flex: 3/5,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center"
    },
    welcomeHeaderContainer: {
        width: "100%",
        flex: 1/5,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    welcomeCards: {
        width: "100%",
        flex: 3.3/5,
        alignItems: "center",
        paddingTop: 20,
        gap: 10
    },
    welcomeCard: {
        width: "90%",
        height: 100,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 0.5,
        borderColor: "#b0b0b0"
    },
    welcomeCardImageContainer: {
        width: "20%",
        height: 70,
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeCardImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        objectFit: "cover"
    },
    welcomeCardContent: {
        width: "70%"
    },
    welcomeCardContentHeaderText: {
        fontSize: 16,
        fontWeight: "500"
    },
    welcomeCardContentText: {
        fontSize: 13,
        fontWeight: "200",
        color: "#b0b0b0"
    },
    welcomeButtonContainer: {
        width: "100%",
        flex: 0.7/5,
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeButton: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeButtonText: {
        fontSize: 20,
        fontWeight: "500"
    }
})

export default welcome