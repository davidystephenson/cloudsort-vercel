export const rows = [
  {
    key: '1',
    name: 'Tony Reichert',
    role: 'CEO',
    status: 'Active'
  },
  {
    key: '2',
    name: 'Zoey Lang',
    role: 'Technical Lead',
    status: 'Paused'
  },
  {
    key: '3',
    name: 'Jane Fisher',
    role: 'Senior Developer',
    status: 'Active'
  },
  {
    key: '4',
    name: 'William Howard',
    role: 'Community Manager',
    status: 'Vacation'
  },
  { key: '5', name: 'Amber Webb', role: 'Developer', status: 'Active' },
  { key: '6', name: 'Larry Parker', role: 'Developer', status: 'Active' },
  { key: '7', name: 'Randy Fisher', role: 'Developer', status: 'Active' },
  { key: '8', name: 'Rebecca Torres', role: 'Developer', status: 'Active' },
  { key: '9', name: 'Zoey Rogers', role: 'Developer', status: 'Active' },
  { key: '10', name: 'William Howard', role: 'Developer', status: 'Active' },
  { key: '11', name: 'Amber Webb', role: 'Developer', status: 'Active' },
  { key: '12', name: 'Larry Parker', role: 'Developer', status: 'Active' },
  { key: '13', name: 'Randy Fisher', role: 'Developer', status: 'Active' },
  { key: '14', name: 'Rebecca Torres', role: 'Developer', status: 'Active' },
  { key: '15', name: 'Zoey Rogers', role: 'Developer', status: 'Active' },
  { key: '16', name: 'William Howard', role: 'Developer', status: 'Active' },
  { key: '17', name: 'Amber Webb', role: 'Developer', status: 'Active' },
  { key: '18', name: 'Larry Parker', role: 'Developer', status: 'Active' },
  { key: '19', name: 'Randy Fisher', role: 'Developer', status: 'Active' },
  { key: '20', name: 'Rebecca Torres', role: 'Developer', status: 'Active' },
  { key: '21', name: 'Zoey Rogers', role: 'Developer', status: 'Active' },
  { key: '22', name: 'William Howard', role: 'Developer', status: 'Active' },
  { key: '23', name: 'Amber Webb', role: 'Developer', status: 'Active' },
  { key: '24', name: 'Larry Parker', role: 'Developer', status: 'Active' },
  { key: '25', name: 'Randy Fisher', role: 'Developer', status: 'Active' },
  { key: '26', name: 'Rebecca Torres', role: 'Developer', status: 'Active' },
  { key: '27', name: 'Zoey Rogers', role: 'Developer', status: 'Active' },
  { key: '28', name: 'William Howard', role: 'Developer', status: 'Active' },
  { key: '29', name: 'Amber Webb', role: 'Developer', status: 'Active' },
  { key: '30', name: 'Larry Parker', role: 'Developer', status: 'Active' }
]

export const columns = [
  {
    key: 'name',
    label: 'NAME'
  },
  {
    key: 'role',
    label: 'ROLE'
  },
  {
    key: 'status',
    label: 'STATUS'
  }
]

interface Item {
  id: string
  static: string
  variable: string
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. Duo Reges: constructio interrete. Ut aliquid scire se gaudeant? Qui autem esse poteris, nisi te amor ipse ceperit? In quibus doctissimi illi veteres inesse quiddam caeleste et divinum putaverunt. Cur igitur, cum de re conveniat, non malumus usitate loqui? Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus. Quod cum ille dixisset et satis disputatum videretur, in oppidum ad Pomponium perreximus omnes. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus.'

function createItem (): Item {
  return {
    id: Math.random().toString(36).substr(2, 9),
    static: 'static',
    variable: lorem.slice(0, Math.random() * 100 + 50)
  }
}

export const createItems = (props: { count: number }): Item[] => {
  const items = []
  for (let i = 0; i < props.count; i++) {
    items.push(createItem())
  }
  return items
}

export const createdItems = createItems({ count: 10000 })
