import $ from 'jquery';
// import { common } from './common';
// console.log($, `second ${common}`);

require.ensure(['jquery'], function(require) {
  var child1 = require('./child1');
  console.log($, child1);
});

require.ensure(['jquery'], function(require) {
  var child2 = require('./child2');
  console.log($, child2);
});