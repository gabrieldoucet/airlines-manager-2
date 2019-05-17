/**
 * Created by Gabriel on 17/04/2017.
 */
var program = require('commander');

program
  .version('0.0.1')
  .command('consolidate', 'Add plane objects to lines and computes line optimisations')
  .command('consolidate2', 'Add plane objects to lines and computes line optimisations')
  .command('debug', 'Debug script')
  .command('dump', 'Export the mongodb collections')
  .command('source', 'Import data from existing files')
  .command('get-config', 'Import data from existing files')
  .parse(process.argv);
