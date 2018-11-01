// import Compile from './compile'
class Bbq {

    constructor (options) {
        if (!options) {
            return
        }

        this.$el = options.el
        this.$data = options.data

        this.compile = new Compile(this)

    }
}

// export default Bbq