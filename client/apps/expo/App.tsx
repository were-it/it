import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { Fonts } from './Fonts'

export default function App() {
  return (
    <Provider>
      <Fonts>
        <NativeNavigation />
      </Fonts>
    </Provider>
  )
}
