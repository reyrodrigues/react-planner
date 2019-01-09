import Catalog from '../../catalog/catalog';

let catalog = new Catalog();

import Areas from './areas';
import Lines from './lines';
import Holes from './holes';
// import * as Items from './items/**/planner-element.jsx';

Object.values(Areas).forEach((element) => catalog.registerElement(element))
Object.values(Lines).forEach((element) => catalog.registerElement(element))
Object.values(Holes).forEach((element) => catalog.registerElement(element))
// for( let x in Items ) catalog.registerElement( Items[x] );

catalog.registerCategory('windows', 'Windows', [Holes.window] );
catalog.registerCategory('doors', 'Doors', [Holes.door] );

export default catalog;
