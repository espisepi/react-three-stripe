import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Instructions from '@/components/dom/instructions'

// Step 2 - update Box components
const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  return (
    <>
      <Box r3f route='/box' />
      {/* Step 5 - delete Instructions components */}
      <Instructions />
      <h1>HOla mundo</h1>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
