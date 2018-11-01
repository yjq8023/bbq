/**
 * 模版解析类
 *
 * **/
class Compile {
    /** 拿到BBQ实例，并对其中的模板进行解析 **/
    constructor(vm) {
        this.vm = vm
        this.el = document.querySelector(this.vm.$el)

        /** 核心要素，使用fragment在内存中解析节点，不要在dom中直接解析，避免反复渲染，提示性能 **/
        const fragment = this.nodeToFragment(this.el)

        this.compile(fragment)

        this.el.appendChild(fragment)
    }

    /** 核心方法 **/
    nodeToFragment(node) {

        let fragment = document.createDocumentFragment()
        const childNodes = node.childNodes

        this.toArray(childNodes).forEach((node) => {
            fragment.appendChild(node)
        })

        return fragment

    }
    // 解析入口
    compile(node) {
        this.toArray(node.childNodes).forEach((node) => {
            // 解析标签节点
            if (this.isElementNode(node)) {
                this.compileElementNode(node)
            }
            // 解析文本节点
            if (this.isTextNode(node)) {
                this.compileTextNode(node)
            }
            // 递归解析字节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    compileElementNode(node) {
        const attrs = node.attributes
        this.toArray(attrs).forEach((attr) => {

            const attrName = attr.name
            if (this.isDirective(attrName)) {
                console.log(attrName)
                const attrValue = attr.value

                if (attrName === 'b-text') {
                    node.textContent = this.vm.$data[attrValue]
                }

                if (attrName === 'b-html') {
                    node.innerHTML = this.vm.$data[attrValue]
                }

                if (attrName === 'b-on') {
                    node.innerHTML = this.vm.$data[attrValue]
                }

            }
        })
    }

    compileTextNode(node) {

    }

    /** 工具方法 **/

    toArray(toArray) {
        return [].slice.call(toArray)
    }

    isElementNode(node) {
        return node.nodeType === 1
    }

    isTextNode(node) {
        return node.nodeType === 3
    }

    isDirective(str) {
        return str.startsWith('b-')
    }
}

export default Compile