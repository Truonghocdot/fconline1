function addCommas(str) {
    var amount = new String(str);
    amount = amount.split("").reverse();
    var output = "";
    for (var i = 0; i <= amount.length - 1; i++) {
        output = amount[i] + output;
        if ((i + 1) % 3 == 0 && (amount.length - 1) !== i) output = '.' + output;
    }
    return output;
}
function removeCommas(str) {
    var amount = new String(str);
    amount = amount.split("").reverse();
    var output = "";
    for (var i = 0; i <= amount.length - 1; i++) {
        if (amount[i] >= 0) output = amount[i] + output;
    }
    return output > 0 ? parseInt(output) : '';
}
$(function() {
    $(window).scroll(function(event) {
        var height = 600;
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("header").addClass("mini-mode");
        } else {
            $("header").removeClass("mini-mode");
        }
        if (scroll > height) {
            $(".back-to-top").addClass("show");
        } else {
            $(".back-to-top").removeClass("show");
        }
    });

    $(".back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    $(".toc_toggle").click(function() {
        $(".table_of_content ul").toggle();
        if ($(".table_of_content ul").css("display") == "none") {
            $(".toc_toggle").html('[ Hiện ]');
        } else
            $(".toc_toggle").html('[ Ẩn ]');
    });
    /* User Login */
    $(".btn-login").click(function() {
        $(".form-signin").show();
        $(".form-signup").hide();
    });
    $(".btn-register").click(function() {
        $(".form-signin").hide();
        $(".form-signup").show();
    });
    $("#btn-signup").click(function() {
        $(".form-signin").hide();
        $(".form-signup").show();
    });
    $("#forgot_pswd").click(function() {
        $(".form-signin").hide();
        $(".form-reset").show();
    });
    $("#cancel_signup").click(function() {
        $(".form-signup").hide();
        $(".form-signin").show();
    });
    $("#cancel_reset").click(function() {
        $(".form-reset").hide();
        $(".form-signin").show();
    });
    $(".form-signin").submit(function(event) {
        var data = $(".form-signin").serialize();
        $.ajax({
            type: "POST",
            url: base_url + "/api/user/login",
            traditional: true,
            data: data,
            dataType: "jsonp",
            success: function(result, textStatus, jqXHR) {
                if (result.status == "success") {
                    swal({
                        text: "Đăng nhập thành công",
                        type: "success",
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    var message = 'Có lỗi xảy ra, vui lòng thử lại sau';
                    if (typeof result.message !== 'undefined') {
                        message = result.message;
                    }
                    swal({
                        text: message,
                        type: "warning",
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log("error occurred.");
            }
        });
        return false;
    });
    $(".form-signup").submit(function(event) {
        var data = $(".form-signup").serialize();
        $.ajax({
            type: "POST",
            url: base_url + "/api/user/register",
            traditional: true,
            data: data,
            dataType: "jsonp",
            success: function(result, textStatus, jqXHR) {
                if (result.status == "success") {
                    swal({
                        text: result.message,
                        type: "success",
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    var message = 'Có lỗi xảy ra, vui lòng thử lại sau';
                    if (typeof result.message !== 'undefined') {
                        message = result.message;
                    }
                    swal({
                        text: message,
                        type: "warning",
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log("error occurred.");
            }
        });
        return false;
    });
    $(".form-change-pass").submit(function(event) {
        var data = $(".form-change-pass").serialize();
        $.ajax({
            type: "POST",
            url: base_url + "/api/user/change_pass",
            traditional: true,
            data: data,
            dataType: "jsonp",
            success: function(result, textStatus, jqXHR) {
                if (result.status == "success") {
                    swal({
                        text: result.message,
                        type: "success",
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    var message = 'Có lỗi xảy ra, vui lòng thử lại sau';
                    if (typeof result.message !== 'undefined') {
                        message = result.message;
                    }
                    swal({
                        text: message,
                        type: "warning",
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log("error occurred.");
            }
        });
        return false;
    });
    $(".form-reset").submit(function(event) {
        var data = $(".form-reset").serialize();
        $.ajax({
            type: "POST",
            url: base_url + "/api/user/reset",
            traditional: true,
            data: data,
            dataType: "jsonp",
            success: function(result, textStatus, jqXHR) {
                if (result.status == "success") {
                    swal({
                        text: "Đăng ký tài khoản thành công",
                        type: "success",
                        showConfirmButton: false
                    });
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    var message = 'Có lỗi xảy ra, vui lòng thử lại sau';
                    if (typeof result.message !== 'undefined') {
                        message = result.message;
                    }
                    swal({
                        text: message,
                        type: "warning",
                    });
                }
            },
            error: function(xhr, status, error) {
                console.log("error occurred.");
            }
        });
        return false;
    });
    /* 
    	GET account info
    */
    get_account();

    function get_account() {
        $.ajax({
            type: "GET",
            url: base_url + "/api/user/info",
            traditional: true,
            dataType: "jsonp",
            success: function(result, textStatus, jqXHR) {
                if (result.status == "success" && typeof result.data !== 'undefined') {
                    account = result.data;
                    var name = account.username;
                    if (account.name) name = account.name;
                    var balance = 0;
                    if (account.money) balance = number_format(account.money);
                    if (account.avatar)
                        var avatar = '<span class="avatar"><img src="' + account.avatar + '" alt="Avatar"/></span>';
                    else var avatar = '<span class="avatar"><img src="' + base_url + '/statics/themes/nghiencode/images/no-avatar.png" alt="Avatar"/></span>';
                    //html = avatar+name;
                    html = name;
                    var icon = '<img src="' + base_url + '/statics/themes/nghiencode/images/coin.png" alt="Coin"/>';
                    $("#account_balance").html(balance + icon);
                    $("#account_name").html(html);
                    $("#authenticated").removeClass('d-none');
                } else {
                    $("#unauthenticated").removeClass('d-none');
                }
            },
            error: function(xhr, status, error) {
                console.log("error occurred.");
            }
        });
    }
    $(".user-logout").click(function() {
        $.ajax({
            type: "GET",
            url: base_url + "/api/user/logout",
            traditional: true,
            dataType: "jsonp",
            success: function(result, textStatus, jqXHR) {
                location.reload();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    });
	$(".form-payment").submit(function(event) {
		var data = $(".form-payment").serialize();
		$.ajax({
			type : "POST",
			url: base_url+"/api/payment/mobile",
			traditional: true,
			data: data,
			dataType: "jsonp",
			success: function(result, textStatus, jqXHR){
				if(result.status=="success") {
					swal({
                        text: result.message,
                        type: "warning",
                    });
					setTimeout(function(){
						location.reload();
					}, 5000);
				} else {
					swal({
                        text: result.message,
                        type: "warning",
                    });
				}
			},
			error: function(xhr,status,error){
				console.log("error occurred.");
			}
		});
		return false;
	});
	
	$(".form-payment-sms").submit(function(event) {
		var smssynt = $("#smssynt").val();
		var telco = $("#telco").val();
		var amount = $("#amount").val();
		if(smssynt=='') {
			swal({
				text: 'Bạn chưa nhập cú pháp',
				type: "warning",
			}); return false;
		} else if(telco=='') {
			swal({
				text: 'Bạn chưa chọn nhà mạng',
				type: "warning",
			}); return false;
		} else if(amount=='') {
			swal({
				text: 'Chưa có mệnh giá của tin nhắn',
				type: "warning",
			}); return false;
		} else {
			var data = $(".form-payment-sms").serialize();
			//console.log(data); return false;
			$.ajax({
			type : "POST",
			url: base_url+"/api/payment/sendsms",
			traditional: true,
			data: data,
			dataType: "jsonp",
			success: function(result, textStatus, jqXHR){
				if(result.status=="success") {
					swal({
                        text: result.message,
                        type: "warning",
                    });
					setTimeout(function(){
						location.reload();
					}, 5000);
				} else {
					swal({
                        text: result.message,
                        type: "warning",
                    });
				}
			},
			error: function(xhr,status,error){
				console.log("error occurred.");
			}
			});
			return false;
		}
	});
	$(".form-payment-kplus").submit(function(event) {
		var cardcode = $("#cardcode").val();
		var cardtime = $("#cardtime").val();
		var extrnumb = $("#extrnumb").val();
		var amount = $("#amount").val();
		if(cardcode=='') {
			swal({
				text: 'Bạn chưa nhập mã thuê bao',
				type: "warning",
			}); return false;
		} else if(cardtime=='') {
			swal({
				text: 'Bạn chưa chọn số tháng',
				type: "warning",
			}); return false;
		} else {
			var data = $(".form-payment-kplus").serialize();
			$.ajax({
			type : "POST",
			url: base_url+"/api/payment/sendkplus",
			traditional: true,
			data: data,
			dataType: "jsonp",
			success: function(result, textStatus, jqXHR){
				if(result.status=="success") {
					swal({
                        text: result.message,
                        type: "warning",
                    });
					setTimeout(function(){
						location.reload();
					}, 5000);
				} else {
					swal({
                        text: result.message,
                        type: "warning",
                    });
				}
			},
			error: function(xhr,status,error){
				console.log("error occurred.");
			}
			});
			return false;
		}
	});
	
	$(".form-buy-turn-wheel").submit(function(event) {
		var data = $(".form-buy-turn-wheel").serialize();
		$.ajax({
			type : "POST",
			url: base_url+"/api/user/buy_turn_wheel",
			traditional: true,
			data: data,
			dataType: "jsonp",
			success: function(result, textStatus, jqXHR){
				if(result.status=="success") {
					swal({
                        text: result.message,
                        type: "warning",
                    });
                    var icon = '<img src="' + base_url + '/statics/themes/nghiencode/images/coin.png" alt="Coin"/>';
                    $("#account_balance").html(number_format(result.new_money) + icon);
					$("#buyTurnWheelModal").modal('hide');
					$("#number_turn").html(result.new_turn);
					setTimeout(function(){
						location.reload();
					}, 5000);
				} else {
					swal({
                        text: result.message,
                        type: "warning",
                    });
				}
			},
			error: function(xhr,status,error){
				console.log("error occurred.");
			}
		});
		return false;
	});
    /*
    	Lazy load image
    */
    if ($.isFunction($.Lazy)) {
        $('.lazy').Lazy({
            effect: "fadeIn",
        });
    }
    /*
    	View more scripts
    */
    var height = $(".viewmore-content").height();
    if (height > 224) {
        $(".viewmore-content").css("max-height", "224px");
        $(".viewmore-area").show();
        $(".viewmore-area").addClass("with-gradient");
    }
    $(".viewmore").click(function() {
        var status = $(".viewmore").data("status");
        if (status == false) {
            $(".viewmore").data("status", true);
            $(".viewmore-content").css("max-height", height + "px");
            $(".viewmore").html("THU GỌN");
            $(".viewmore-area").removeClass("with-gradient");
        } else {
            $(".viewmore").data("status", false);
            $(".viewmore-content").css("max-height", "224px");
            $(".viewmore").html("XEM THÊM");
            $(".viewmore-area").addClass("with-gradient");
        }
    });
});
function get_payment_history() {
	$.ajax({
		type : "GET",
		url: base_url+"/api/payment/history",
		traditional: true,
		dataType: "jsonp",
		success: function(result, textStatus, jqXHR) {
			var html = ''; var cl = '';
			if(result.status=="success" && typeof result.data !== 'undefined') {
				$(result.data).each(function(index, element) {
					if(element.stt=='1') cl = 'style="color:green"'; else cl = '';
					html += '<tr>\
								<td>'+element.tran_id+'</td>\
								<td>'+element.card_code+'</td>\
								<td>'+element.card_seri+'</td>\
								<td>'+element.card_type+'</td>\
								<td '+cl+'>'+element.amount+'</td>\
								<td '+cl+'>'+element.response_message+'</td>\
							</tr>';
				});
				$("#list_history").html(html);
			} else {
				$("#list_history").html('<tr ><td colspan="6" style="text-align:center">Hiện chưa có giao dịch</td></tr>');
			}
		},
		error: function(xhr,status,error){
			console.log(error);
		}
	});
};
function onchange_teco() {
	var telco = $("#telco").val();
	var sms = $("#smssynt").val();
	if(sms=='') {
		swal({
			text: 'Vui lòng điền cú pháp nạp!',
			type: "warning",
		});
	} else {
		$.ajax({
			type : "GET",
			url: base_url+"/api/payment/getsmssynt",
			data: {
				smssynt: sms,
				telco: telco
			},
			traditional: true,
			dataType: "jsonp",
			success: function(result, textStatus, jqXHR) {
				if(result.status=="success") {
					$("#sms_discount").val(addCommas(result.cent));
					$("#sms_amount_discount").val(addCommas(result.amount_discount));
					$("#amount").val(addCommas(result.amount));
				}
			},
			error: function(xhr,status,error){
				console.log(error);
			}
		});
	}
}
function onchange_kplus() {
	var cardtime = $("#cardtime").val();
	var extrnumb = $("#extrnumb").val();
	if(cardtime=='') {
		swal({
			text: 'Vui lòng chọn số tháng!',
			type: "warning",
		});
	} else {
		$.ajax({
			type : "GET",
			url: base_url+"/api/payment/getkplus",
			data: {
				cardtime: cardtime,
				extrnumb: extrnumb
			},
			traditional: true,
			dataType: "jsonp",
			success: function(result, textStatus, jqXHR) {
				if(result.status=="success") {
					$("#kplus_discount").val(result.cent);
					$("#kplus_amount_discount").val(result.amount_discount);
					$("#amount").val(result.amount);
				}
			},
			error: function(xhr,status,error){
				console.log(error);
			}
		});
	}
}
function buy_now(id) {
    swal({
        title: "Tài khoản #" + id,
        text: "Bạn có chắc chắn muốn thực hiện giao dịch tài khoản này?",
        type: "info",
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonClass: "btn btn-info mr-2",
        confirmButtonText: "Mua ngay",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Hủy",
    }).then(t => {
        if (id && t.value) {
			var data = $(".form-buy").serialize();
			$.ajax({
				type : "POST",
				url: base_url+"/api/user/buy_item",
				traditional: true,
				data: data,
				dataType: "jsonp",
				success: function(result, textStatus, jqXHR){
					if(result.status=="success") {
						swal({
							html: result.message,
							type: "success",
						});
						swal({html: result.message,type: "success",}).then(function(){ location.reload();});
					} else {
						swal({
							text: result.message,
							type: "warning",
						});
					}
				},
				error: function(xhr,status,error){
					console.log("error occurred.");
				}
			});
			return false;
        }
    });
    return false;
}
function buy_package(id) {
    swal({
        title: id,
        text: "Bạn có chắc chắn muốn thực hiện giao dịch này?",
        type: "info",
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonClass: "btn btn-info mr-2",
        confirmButtonText: "Mua ngay",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Hủy",
    }).then(t => {
        if (id && t.value) {
			var data = $(".form-payment-item").serialize();
			$.ajax({
				type : "POST",
				url: base_url+"/api/user/buy_item_package",
				traditional: true,
				data: data,
				dataType: "jsonp",
				success: function(result, textStatus, jqXHR){
					if(result.status=="success") {
						swal({
							text: result.message,
							type: "success",
						});
						swal({text: result.message,type: "success",}).then(function(){ location.reload();});
					} else {
						swal({
							text: result.message,
							type: "warning",
						});
					}
				},
				error: function(xhr,status,error){
					console.log("error occurred.");
				}
			});
			return false;
        }
    });
    return false;
}
function order_acc(id) {
    swal({
        title: id,
        text: "Bạn có chắc chắn muốn thực hiện giao dịch này?",
        type: "info",
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonClass: "btn btn-info mr-2",
        confirmButtonText: "Mua ngay",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Hủy",
    }).then(t => {
        if (id && t.value) {
			var data = $(".form-order-acc").serialize();
			$.ajax({
				type : "POST",
				url: base_url+"/api/user/order_acc",
				traditional: true,
				data: data,
				dataType: "jsonp",
				success: function(result, textStatus, jqXHR){
					if(result.status=="success") {
						swal({
							text: result.message,
							type: "success",
						});
						swal({text: result.message,type: "success",}).then(function(){ location.reload();});
					} else {
						swal({
							text: result.message,
							type: "warning",
						});
					}
				},
				error: function(xhr,status,error){
					console.log("error occurred.");
				}
			});
			return false;
        }
    });
    return false;
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
function searchA() {
	var e = $("input[name=q]").val();
	"" !== e.trim() && (e = e.replace(/(<([^>]+)>)/gi, "").replace(/[`~!@#$%^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, ""), e = e.split(" ").join("+"), window.location.href = "/search/?q=" + e)
}