import _ from 'lodash';
import Util from '../utils/common';
class QuarkUtil {
  addExtendedInfo(quark, qtype_properties, is_gluon_fetched = false) {
	  //let copiedQuark = JSON.parse(JSON.stringify(quark));
	  let copiedQuark = _.cloneDeep(quark);
	  let copiedQtypeProperties = _.cloneDeep(qtype_properties);
	  
	  // Additional initial info on this quark
	  let util = new Util();
	  copiedQuark.period_str = util.period2str(copiedQuark);
	  
	  let quark_properties = null;
	  if (copiedQtypeProperties && copiedQuark.quark_type_id in copiedQtypeProperties){
	    quark_properties = copiedQtypeProperties[copiedQuark.quark_type_id];
	    if (!quark_properties) {
		    quark_properties = null;
	    }
	  }
	  copiedQuark.quark_properties = quark_properties;
	  copiedQuark.is_gluon_fetched = is_gluon_fetched;
	  return copiedQuark;
  }

  addGluons(quark, response) {
	  if (quark.is_gluon_fetched) {
	    return quark;
	  }

	  let quark_properties = [];
	  if (quark.quark_properties) {
	    quark_properties = quark.quark_properties.map(x => {
		    if (!x) {
		      return null;
		    }
		    let gluons = response[x.quark_property_id];
		    if (!gluons) {
		      return null;
		    }
		    x.quark_property.gluons = gluons;
		    return x;
	    });
	  }

	  let active_prop = {id: 'active', quark_type_id: 2, quark_property_id: 'active', is_required: false};
	  active_prop['quark_property'] = {id: 'active',
					                           caption: "What is " + quark.name + "?",
					                           caption_ja: quark.name + 'とは',
					                           gluons: response.active}
	  quark_properties.push(active_prop);
	  let passive_prop = {id: 'passive', quark_type_id: 2, quark_property_id: 'passive', is_required: false};
	  passive_prop['quark_property'] = {id: 'passive',
					                            caption: "Quarks Related to " + quark.name,
					                            caption_ja: quark.name + 'に関する事項',
					                            gluons: response.passive}
	  quark_properties.push(passive_prop);


	  quark.quark_properties = quark_properties;
	  quark.is_gluon_fetched = true;
	  return quark;
  }

  form_keys = [
	  'id',
	  'name',
	  'image_path',
	  'auto_fill',
	  'description',
	  'start',
	  'end',
	  'start_accuracy',
	  'end_accuracy',
	  'is_momentary',
	  'url',
	  'affiliate',
	  'quark_type_id',
	  'is_private',
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
	    return null;
	  });
	  return ret;
  }

}
export default QuarkUtil;
