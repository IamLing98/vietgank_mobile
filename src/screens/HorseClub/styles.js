
const styles = {
    app: {
        flex: 4, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        width: "100%",
    },
    row: {
        flexDirection: "row",
        borderWidth: 1,
        borderBottom: 1,
        borderColor: '#dfe1e5',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 1,
    },
    "1col": {
        borderColor: "#fff",
        borderWidth: 1,
        flex: 1
    },
    "2col": {
        borderColor: "#fff",
        borderWidth: 1,
        flex: 2
    },
    "3col": {
        borderColor: "#fff",
        borderWidth: 1,
        flex: 3
    },
    "4col": {
        flex: 4
    }, shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    textRow: {
        height: 56,
        padding: 12,
        marginBottom: 12,
        backgroundColor: "hsl(0,0%,96.5%)"
    }, bookingWrapper: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        width: '100%',
        height: 56,
        borderColor: 'black',
        borderWidth: 1,
        borderColor: '#dfe1e5',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center"
    },
    bookingButton: {
        backgroundColor: 'black',
    },
    button: {
        height: 44,
        width: 144,
        marginVertical: 8,
        borderRadius: 4,
        margin: 12
    },
    backButton: {
        backgroundColor: 'gray',
    },
};

export default styles;