import styles from './SearchArea.module.css'
import PageButtons from './PageButtons/Components/PageButtons';
import Table from './SearchTable/Components/Table';
import { motion } from 'framer-motion';
import animation from './Animation';
import MainFilter from './SearchFields/MainFilter';

const SearchArea = () => {
  return (
    < motion.div className={ styles.container }
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