import Util from '../utils/common';
class GluonUtil {
  gluedQuark(subject, gluon) {
	  if (subject.values.id === gluon.active.values.id) {
	    return gluon.passive
	  } else if (subject.values.id === gluon.passive.values.id) {
	    return gluon.active
	  }
	  return false;
  }

  form_keys = [
	  'id',
	  'gluon_type_id',
	  'active_id',
	  'passive_id',
	  'passive',
	  'relation',
	  'suffix',
	  'start',
	  'end',
	  'start_accuracy',
	  'end_accuracy',
	  'is_momentary',
	  'is_exclusive',
  ];
  sanitizeFormData(form) {
	  let util = new Util();
	  let sanitized = util.sanitizeFormData(form);

	  let ret = {};
	  Object.keys(sanitized).map((value, index) => {
	    if (this.form_keys.indexOf(value) >= 0) {
		    ret[value] = sanitized[value];
	    }
	    return ''
	  });
	  return ret;
  }

}
export default GluonUtil;
