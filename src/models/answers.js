module.exports = (sequeliza, DataTypes) => {
    const Answer = sequilize.define('Answer', {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        is_annon: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Answer;
}