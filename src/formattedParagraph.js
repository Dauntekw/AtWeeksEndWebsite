class FormattedParagraph extends HTMLParagraphElement {
  static observedAttributes = ["textContent"]
  constructor() {
    super();
    this.originalText = ""
    this.tabSequence = "&nbsp;&nbsp;&nbsp;&nbsp;";
    this.newlineSequence = "<br />" + this.tabSequence;
  }
  swapNewLines() {
    var pre = this.innerHTML.split('\\n');
    console.log(pre);
    if (!pre.length)
      return;
    var newString = "";
    for(var i = 0; i < pre.length; i++) {
      newString += pre[i];
      if (i + 1 < pre.length)  {
        newString += this.newlineSequence;
      }
    }
    console.log(newString);
    this.innerHTML = newString;
  }
  swapTabs() {
    var pre = this.innerHTML.split('\\t');
    console.log(pre);
    if (!pre.length)
      return;
    var newString = "";
    for(var i = 0; i < pre.length; i++) {
      newString += pre[i];
      if (i + 1 < pre.length)  {
        newString += this.tabSequence;
      }
    }
    console.log(newString);
    this.innerHTML = newString;
  }
  formatInnerHTML() {
    this.originalText = this.innerHTML;
    this.swapNewLines();
    this.swapTabs();
  }
  connectedCallback() {
    setTimeout( () => {
      this.formatInnerHTML()
    });
  }
  attributeChangedCallback(name, oldValue, newValue) {
    setTimeout( () => this.formatInnerHTML())
  }
}
customElements.define("f-p", FormattedParagraph, {extends: "p"});