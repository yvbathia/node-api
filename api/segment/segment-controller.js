const segment = require('./segment');

class SegmentController{
    constructor(router){
        router.get('/api/v1/segments/:id',segment.getSegmentsByProductId);
        router.get('/api/v1/segment/:id',segment.getSegmentById);
        router.put('/api/v1/segment/:id',segment.updateSegment);
    }
}
module.exports = SegmentController;