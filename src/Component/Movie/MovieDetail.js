import React, { PureComponent } from "react";
import { Spin, Rate, Icon } from 'antd';
import Server from "../../Server/server";
import './MovieDetail.css';

class MovieDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            detail: {},
        }
    }

    componentDidMount() {
        this.getMovieDetail();
    }

    getMovieDetail() {
        this.setState({
            loading: true,
        });
        Server.subject(this.props.match.params.id).then( result => {
            if (result) {
                this.setState({
                    detail: result.data,
                    loading: false,
                });
            }
        });
    }

    render() {
        const detail = this.state.detail;
        console.log(detail);
        return (
            this.state.loading 
            ? <div style={{textAlign: 'center'}}><Spin size={'large'}/></div>
            : <div className={'wrapper'}>
                <h1>
                    <span>{detail.title}</span>
                    <span>{`(${detail.year})`}</span>
                </h1>
                <div className={'article'}>
                    <div className={'subject'} style={{margin: '0 auto'}}>
                        <div className={'pic'}>
                            <img src={detail.images.small} alt={detail.title}/>
                        </div>
                        <div className={'info'} style={{width: '500px', display: 'inline-block', verticalAlign: 'top'}}>
                            <span>导演：{detail.directors.map( item => `${item.name}`)}</span>
                            <br/>
                            <span>主演：{detail.casts.map(item => `${item.name}`).join('/')}</span>
                            <br/>
                            <span>类型：{detail.genres.join('/')}</span>
                            <br/>
                            <span>制片地区/国家：{detail.countries.join('/')}</span>
                            <br/>
                            <span>上映日期：</span>
                            <br/>
                            <span>片长：</span>
                            <br/>
                            <span>又名：{detail.aka.join('/')}</span>
                            <br/>
                            <Rate character={<Icon type='heart'/>} allowHalf disabled value={Math.round((detail.rating.average/2)%0.5 === 0 ? detail.rating.average/2 : Math.round(detail.rating.average/2))} style={{fontSize: '10px', color: 'red', marginTop: '3px'}} />
                        </div>
                        <div className={'relatedInfo'}>
                            <i style={{color: '#007722', fontSize: '20px'}}>{`${detail.title}的简介......`}</i>
                            <p style={{textIndent: '2em'}} >{detail.summary}</p>
                        </div>
                        <div className={'castsInfo'}>
                            <i style={{color: '#007722', fontSize: '20px'}}>{`${detail.title}的影人......`}</i>
                            <br/>
                            {
                                detail.casts.map((item) => (
                                    <div style={{display: 'inline-block', margin: '20px 10px 0 10px', textAlign: 'center'}}>
                                        <img style={{maxHeight: '180px'}} src={'https://images.weserv.nl/?url='+item.avatars.small.substring(7)} alt={item.name}/>
                                        <br/>
                                        <span>{item.name}</span>
                                    </div>
                                ))
                            }
                            {/* <div className={'castsImgWrap'} style={{textAlign: 'center'}}>
                                <img style={{maxHeight: '180px'}} src={'https://images.weserv.nl/?url='+detail.casts[0].avatars.small.substring(7)} alt={detail.casts[0].name}/>
                                <br/>
                                <span>{detail.casts[0].name}</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetail;