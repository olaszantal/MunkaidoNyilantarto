import { View, Text, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
const SettingsPage = ({ handleLogout }) => {

    return (
        <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.shadow]}>
            <Text style={styles.buttonText}>Kijelentkezés</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 50,
        alignSelf: 'stretch',
        textAlign: 'center',
        paddingVertical: '5%',
        paddingHorizontal: '7%',
        borderRadius: 20,
        color: 'blue',
        backgroundColor: '#0091ff',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
export default SettingsPage;