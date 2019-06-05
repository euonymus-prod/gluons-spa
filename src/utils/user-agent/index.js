import * as TYPES from './types'

class UserAgent {
  static instance
  static agent

  static isMobile

  static isIos
  static isIpad
  static isIpone
  static isAndroid
  static isMac
  static isWindows

  static osType
  static browserType

  constructor() {
    this.setAgent()
    this.setIsMobile()
    this.setIsIos()
    this.setIsIpad()
    this.setIsIphone()
    this.setIsAndroid()
    this.setIsMac()
    this.setIsWindows()

    this.setOsType()
    this.setBrowserType()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserAgent()
    }
    return this.instance
  }

  init() {
    this.instance = null
    this.state = null
  }

  // Getters -------
  getAgent() {
    if (!this.agent) {
      this.setAgent()
    }
    return this.agent
  }
  getIsMobile() {
    if (!this.isMobile) {
      this.setIsMobile()
    }
    return this.isMobile
  }
  getIsIos() {
    if (!this.isIos) {
      this.setIsIos()
    }
    return this.isIos
  }
  getIsIpad() {
    if (!this.isIpad) {
      this.setIsIpad()
    }
    return this.isIpad
  }
  getIsIphone() {
    if (!this.isIphone) {
      this.setIsIphone()
    }
    return this.isIphone
  }
  getIsAndroid() {
    if (!this.isAndroid) {
      this.setIsAndroid()
    }
    return this.isAndroid
  }
  getIsMac() {
    if (!this.isMac) {
      this.setIsMac()
    }
    return this.isMac
  }
  getIsWindows() {
    if (!this.isWindows) {
      this.setIsWindows()
    }
    return this.isMac
  }
  getOsType() {
    if (!this.osType) {
      this.setOsType()
    }
    return this.osType
  }
  getBrowserType() {
    if (!this.browserType) {
      this.setBrowserType()
    }
    return this.browserType
  }

  // Setters -------
  setAgent() {
    this.agent = window.navigator.userAgent.toLowerCase()
  }
  setIsMobile() {
    this.isMobile = (this.getIsAndroid() || this.getIsIphone())
  }
  setIsIos() {
    this.isIos =  (this.getIsIpad() || this.getIsIphone())
  }
  setIsIpad() {
    this.isIpad = (this.getAgent().indexOf('ipad') > -1)
  }
  setIsIphone() {
    this.isIphone = (this.getAgent().indexOf('iphone') > -1)
  }
  setIsMac() {
    this.isMac = (this.getAgent().indexOf('macintosh') > -1)
  }
  setIsWindows() {
    this.isWindows = (this.getAgent().indexOf('windows') > -1)
  }
  setIsAndroid() {
    this.isAndroid = (this.getAgent().indexOf('android') > -1)
  }

  setOsType() {
    let result
    
    if (this.getIsMac()) {
      result = TYPES.OS_MAC
    } else if (this.getIsWindows()) {
      result = TYPES.OS_WINDOWS
    } else if (this.getIsIos()) {
      result = TYPES.OS_IOS
    } else if (this.getIsAndroid()) {
      result = TYPES.OS_ANDROID
    }
    this.osType = result
  }

  setBrowserType() {
    let result
    
    if (this.getAgent().indexOf(TYPES.BROWSER_MSIE) > -1 || this.getAgent().indexOf('trident/7') > -1) {
      result = TYPES.BROWSER_MSIE
    } else if (this.getAgent().indexOf(TYPES.BROWSER_EDGE) > -1) {
      result = TYPES.BROWSER_EDGE
    } else if (this.getAgent().indexOf(TYPES.BROWSER_CHROME) > -1 || (this.getAgent().indexOf('crios') > -1)) {
      result = TYPES.BROWSER_CHROME
    } else if (this.getAgent().indexOf(TYPES.BROWSER_SAFARI) > -1) {
      result = TYPES.BROWSER_SAFARI
    } else if (this.getAgent().indexOf(TYPES.BROWSER_OPERA) > -1) {
      result = TYPES.BROWSER_OPERA
    } else if (this.getAgent().indexOf(TYPES.BROWSER_FIREFIX) > -1) {
      result = TYPES.BROWSER_FIREFIX
    }
    this.browserType = result
  }
}
export default UserAgent
