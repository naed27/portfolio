import PageButtons from './PageButtons/Components/PageButtons';
import Table from './SearchTable/Components/Table';
import { motion } from 'framer-motion';
import animation from './Animation';
import MainFilter from './SearchFields/MainFilter';

const SearchArea = () => {
  return (
    <motion.div className={`relative flex flex-col items-center h-full w-full max-h-[800px] max-w-[1000px] p-0 gap-[15px]`}
      variants = { animation }
      initial = 'initial'
      animate = 'final'
      exit = 'exit'>
      <MainFilter/>
      <Table/>
      <PageButtons/>
    </motion.div>
  )
}

export default SearchArea