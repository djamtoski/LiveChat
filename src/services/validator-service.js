export default class ValidatorService {

  constructor() {

    this.rules = {};
    this.errors = {};
    this.validationRules = [
      {
        name: 'empty',
        check: '',
        type: 'string'
      },
      {
        name: 'email',
        check: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]{2,}\..{2, 4}$/,
        type: 'regex',
      }
    ];
  }

  addRule(ruleName = '', ruleObject = {}) {
    this.rules[ruleName] = ruleObject;
  }

  processRules() {
    this.errors = {};
    Object.keys(this.rules).forEach((field) => {
      let selectedRule = this.getRule(this.rules[field].rule);
      if (Object.keys(selectedRule).length > 0) {
        if (selectedRule.type === 'string' &&
          this.rules[field].value.trim() === selectedRule.check) {
          this.errors[field] = this.rules[field].message;
        } else if(selectedRule.type === 'regex' &&
          !selectedRule.check.test(this.rules[field].value.trim())
        ){
          this.errors[field] = this.rules[field].message;
          console.log(this.rules[field].value.trim());
        }
      }
    })
  }

  getRule(ruleName) {
    let selectedRule = {};
    this.validationRules.forEach((rule) => {
      if (rule.name === ruleName) {
        selectedRule = rule;
      }
    });
    return selectedRule;
  }

}