// article.route.js
import express from 'express'
import validate from 'express-validation'
import articleCtrl from '../controllers/article.controller'
import paramVaidation from '../../config/param-validation'

const router = express.Router()

router.route('/')
  .post(validate(paramVaidation.createArticle), articleCtrl.articlePost) /** 新增 Article 值組 */
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */


router.route('/:article_id')
  .put(articleCtrl.articlePut) /** 修改 Article 值組 */
  .delete(articleCtrl.articleDelete) /** 刪除 Article 值組 */

export default router
