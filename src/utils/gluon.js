import Util from '../utils/common';
class GluonUtil {
    gluedQuark(current_quark, gluon) {
	if (current_quark.id == gluon.active_id) {
	    return gluon.passive
	} else if (current_quark.id == gluon.passive_id) {
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
	});
	return ret;
    }

}
export default GluonUtil;
